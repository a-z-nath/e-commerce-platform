import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
import { ApiErrorHandler } from "../utills/ApiErrorHandler.js";
import { ApiResponseHandler } from "../utills/ApiResponseHandler.js";
import { asyncHandler } from "../utills/asyncHandler.js";
import { uploadToCloudinarWithBase64 } from "../utills/cloudinary.js";

const addProduct = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    throw new ApiErrorHandler(401, "Unauthorized request");
  }

  const { description, name, price, stock, size, categoryName, categoryType } =
    req.body;

  if (
    [description, name, price, stock, categoryName, categoryType].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiErrorHandler(400, "All fields are required.");
  }

  let category;
  try {
    category = await Category.findOne({
      name: categoryName,
      type: categoryType,
    });

    if (!category) {
      throw ApiErrorHandler(
        400,
        "Category with given name & type is not found."
      );
    }
  } catch (error) {
    throw new ApiErrorHandler(400, "Category lookup failed.");
  }

  const file = req.file;
  if (!file) {
    throw new ApiErrorHandler(401, "Product image file is required.");
  }

  const fileBuffer = file.buffer;
  const mimeType = file.mimetype;
  const base64Data = Buffer.from(fileBuffer).toString("base64");
  const fileUri = `data:${mimeType};base64,${base64Data}`;

  try {
    const upload = await uploadToCloudinarWithBase64(
      fileUri,
      file.originalname
    );
    if (!upload.success) {
      throw new ApiErrorHandler(500, "Error while uploading image.");
    }

    const image = upload.result.secure_url;

    let sizeArr = JSON.parse(size) === "" ? [] : JSON.parse(size);
    console.log("size: ", size, " ", sizeArr, Array.isArray(sizeArr));

    if (!Array.isArray(sizeArr)) {
      sizeArr = JSON.parse(sizeArr);
      if (!Array.isArray(sizeArr)) {
        sizeArr = [];
      }
    }

    const newProduct = await Product.create({
      name,
      description,
      image,
      price,
      stock,
      category: category._id, // Pass category ID
      size: sizeArr || [],
    });

    if (!newProduct) {
      throw new ApiErrorHandler(500, "Product creation failed.");
    }

    const addedProduct = await Product.findById(newProduct._id).populate(
      "category"
    );
    if (!addedProduct) {
      throw new ApiErrorHandler(500, "Failed to retrieve added product.");
    }

    return res
      .status(201)
      .json(
        new ApiResponseHandler(201, addedProduct, "Product added successfully.")
      );
  } catch (error) {
    console.error("Error while adding product:", error);
    throw new ApiErrorHandler(400, "Error while adding product.");
  }
});

// it fetches all products
// or products which have both of name and type param value
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const { name, type } = req.query;

    let filter = {};

    if (name || type) {
      // Find the categories that match the provided name and/or type
      const categories = await Category.find({
        ...(name && { name: name.toLowerCase() }), // Match the name if provided
        ...(type && { type: type.toLowerCase() }), // Match the type if provided
      });

      // If categories are found, filter products by the matching category IDs
      if (categories.length > 0) {
        filter.category = { $in: categories.map((category) => category._id) };
      } else {
        throw new ApiErrorHandler(404, "No categories found.");
      }
    }

    // Get the products and the total count
    const [products, totalProducts] = await Promise.all([
      Product.find(filter)
        .populate("category")
        .sort({ createdAt: sortDirection }) // Sort based on date
        .skip((page - 1) * perPage)
        .limit(perPage),
      Product.countDocuments(filter),
    ]).catch((err) => {
      throw new ApiErrorHandler(400, "Couldn't fetch products from database");
    });

    return res.status(200).json(
      new ApiResponseHandler(
        200,
        {
          products,
          totalProducts,
        },
        "Fetched all procuct with provided category."
      )
    );
  } catch (error) {
    console.log(error);

    throw new ApiErrorHandler(500, "Error while fetching products.");
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById({ _id: productId });

  if (!product) {
    throw new ApiErrorHandler(404, "Product not found.");
  }

  return res
    .status(200)
    .json(
      new ApiResponseHandler(
        200,
        product,
        `Product with id: ${productId} retrive successfully.`
      )
    );
});

export { addProduct, getAllProducts, getProductById };
