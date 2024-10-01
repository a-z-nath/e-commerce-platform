import { Category } from "../models/category.model.js";
import { ApiErrorHandler } from "../utills/ApiErrorHandler.js";
import { ApiResponseHandler } from "../utills/ApiResponseHandler.js";
import { asyncHandler } from "../utills/asyncHandler.js";

const addCategory = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    throw new ApiErrorHandler(400, "Unauthorized request");
  }
  const { name, type } = req.body;
  if ([name, type].some((field) => field?.trim() === "")) {
    throw new ApiErrorHandler(400, `All fields are required.`);
  }
  const existedCategory = await Category.findOne({
    $and: [{ name }, { type }],
  });

  if (existedCategory) {
    throw new ApiErrorHandler(400, `The category already existed.`);
  }

  const category = await Category.create({
    name,
    type,
  });

  const addedCategory = await Category.findById(category._id);

  if (!addedCategory) {
    throw new ApiErrorHandler(
      400,
      "Something went wrong while adding the category"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponseHandler(200, addedCategory, "Category added successfully")
    );
});

const getCategories = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const categories = await Category.find()
      .sort({ createdAt: sortDirection })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalCategories = await Category.countDocuments();

    return res.status(200).json(
      new ApiResponseHandler(
        200,
        {
          categories,
          totalCategories,
        },
        "Category fetches successfully."
      )
    );
  } catch (error) {
    throw new ApiErrorHandler(
      400,
      "Something went wrong while fetching categories"
    );
  }
});

const getCategoryById = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  console.log("category ", categoryId);

  try {
    const categoy = await Category.findById({ _id: categoryId });
    console.log("check complete");

    if (!categoy) {
      throw new ApiError(401, "User not found.");
    }

    return res
      .status(200)
      .json(
        new ApiResponseHandler(
          200,
          categoy,
          `Category with id: ${categoryId} retrive successfully.`
        )
      );
  } catch (error) {
    throw new ApiErrorHandler(500, "Error while finding category by Id");
  }
});

// const findCategory = asyncHandler(async (req, res) => {
//   const { categoryId } = req.params;
//   console.log("category ", categoryId);

//   try {
//     const categoy = await Category.findById({ _id: categoryId });
//     console.log("check complete");

//     if (!categoy) {
//       throw new ApiError(401, "User not found.");
//     }

//     return res
//       .status(200)
//       .json(
//         new ApiResponseHandler(
//           200,
//           categoy,
//           `Category with id: ${categoryId} retrive successfully.`
//         )
//       );
//   } catch (error) {
//     throw new ApiErrorHandler(500, "Error while finding category by Id");
//   }
// });

// const editCategoryById = asyncHandler(async (req, res) => {
//   const { categoryId } = req.params;

// });
export { addCategory, getCategories, getCategoryById };
