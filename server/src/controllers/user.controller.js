import { User } from "../models/user.model.js";
import { ApiErrorHandler } from "../utills/ApiErrorHandler.js";
import { ApiResponseHandler } from "../utills/ApiResponseHandler.js";
import { asyncHandler } from "../utills/asyncHandler.js";
import jwt from "jsonwebtoken";
import { uploadToCloudinarWithBase64 } from "../utills/cloudinary.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiErrorHandler(
      500,
      `Something went wrong while generating refresh and access token.`
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // get user data {fullName, email, password, username}
  // validate each of them valid string or not
  // check if user exist with {email | username}
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res
  const { fullName, userName, email, password } = req.body;

  if (
    [fullName, userName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiErrorHandler(400, `All fields are required.`);
  }
  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    throw new ApiErrorHandler(
      400,
      `User with email or username already exists.`
    );
  }

  const user = await User.create({
    fullName,
    email,
    userName: userName.toLowerCase(),
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -__v"
  );

  if (!createdUser) {
    throw new ApiErrorHandler(
      500,
      `Something went wrong while registering the user`
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponseHandler(200, createdUser, `User registered successfully`)
    );
});

const signinUser = asyncHandler(async (req, res) => {
  // get user data {email | username, password,}
  // validate each of them valid string or not
  // check if user exist with {email | username}
  // validate provided password with user actual password
  // generate accessToken & refreshToken
  // send both token to user with response
  // return res
  const { email, userName, password } = req.body;

  if (!email && !userName) {
    throw new ApiErrorHandler(400, `username or email is required`);
  }

  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (!user) {
    throw new ApiErrorHandler(404, `User does not exists.`);
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiErrorHandler(400, `Invalid user credentials.`);
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const signedInUser = await User.findById(user._id).select(
    "-password -refreshToken -__v"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponseHandler(
        200,
        {
          user: signedInUser,
          accessToken,
          refreshToken,
        },
        `User signed in successfully.`
      )
    );
});

const signoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponseHandler(200, {}, `User signed out successfully.`));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiErrorHandler(401, `Unauthorized request.`);
  }

  try {
    const decodedToken = await jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiErrorHandler(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiErrorHandler(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponseHandler(
          200,
          {
            accessToken,
            refreshToken,
          },
          `Access Token refreshed.`
        )
      );
  } catch (error) {
    throw new ApiErrorHandler(401, error?.message || `Invalid refresh token`);
  }
});

const chnagePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiErrorHandler(400, `Invalid Old Password`);
  }

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponseHandler(200, {}, `Password changed successfully.`));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email, userName } = req.body;

  // Check if any required fields are missing
  if (!fullName && !email && !userName) {
    throw new ApiErrorHandler(400, `At least one field is required for update`);
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          fullName: fullName || req.user?.fullName,
          email: email || req.user?.email,
          userName: userName || req.user?.userName,
        },
      },
      { new: true }
    ).select("-password -refreshToken -__v");

    return res
      .status(200)
      .json(
        new ApiResponseHandler(
          200,
          user,
          "Account details updated successfully"
        )
      );
  } catch (error) {
    throw new ApiErrorHandler(400, `userName or email is already exists.`);
  }
});

// Admin Access only
const getUsers = asyncHandler(async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      throw new ApiErrorHandler(401, `You are not allowed to see all users.`);
    }

    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    // nth page users
    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    // overall users number
    const totalUsers = await User.countDocuments();

    res.status(200).json(
      new ApiResponseHandler(
        200,
        {
          users: usersWithoutPassword,
          totalUsers,
        },
        "Users fetches successfully"
      )
    );
  } catch (error) {
    throw new ApiErrorHandler(400, error?.message || `${error}`);
  }
});

// self and Admin access only
const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const issuedBy = req.user;

  if (!issuedBy.isAdmin && userId !== issuedBy._id.toString()) {
    throw new ApiErrorHandler(401, "Unauthorized request.");
  }

  const user = await User.findById({ _id: userId });

  if (!user) {
    throw new ApiErrorHandler(401, "User not found.");
  }

  const deletedUser = await User.findByIdAndDelete({ _id: userId });

  if (!deletedUser) {
    throw new ApiErrorHandler(401, "User not deleted.");
  }

  return res.status(201).json(new ApiResponseHandler(200, {}, `user deleted.`));
});

// Admin access only.
const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const admin = req.user;
  if (!admin.isAdmin) {
    throw new ApiErrorHandler(401, `Unauthorized request.`);
  }

  const user = await User.findById({ _id: userId });

  if (!user) {
    throw new ApiError(401, "User not found.");
  }

  const userDetails = await User.findById(user._id).select(
    "-password -refreshToken -__v"
  );

  return res
    .status(200)
    .json(
      new ApiResponseHandler(200, userDetails, "User retrive successfully.")
    );
});

const changeAvatar = asyncHandler(async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(404).json(new ApiErrorHandler(404, `No file provided.`));
  }

  const fileBuffer = file.buffer;
  const mimeType = file.mimetype;
  const base64Data = Buffer.from(fileBuffer).toString("base64");
  const fileUri = `data:${mimeType};base64,${base64Data}`;

  try {
    const upload = await uploadToCloudinarWithBase64(
      fileUri,
      `profile-${req.user._id.toString()}`
    );

    if (!upload.success) {
      return res
        .status(404)
        .json(
          new ApiErrorHandler(
            404,
            `Something went wrong while uploading to cloudinary`
          )
        );
    }
    const imageUrl = upload.result?.secure_url;

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          avatar: imageUrl,
        },
      },
      { new: true }
    ).select("-password -refreshToken -__v");

    if (!user) {
      return res.status(404).json(new ApiErrorHandler(404, `User not found.`));
    }

    return res
      .status(200)
      .json(new ApiResponseHandler(200, user, `Avatar uploaded successfully.`));
  } catch (error) {
    console.log("Error updating avatar:", error);
    return res
      .status(500)
      .json(
        new ApiErrorHandler(500, `Something went wrong on updating avatar.`)
      );
  }
});

export {
  registerUser,
  signinUser,
  signoutUser,
  refreshAccessToken,
  chnagePassword,
  updateAccountDetails,
  getUserById,
  getUsers,
  deleteUser,
  changeAvatar,
};
