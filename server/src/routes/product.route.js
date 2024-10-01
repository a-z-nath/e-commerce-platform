import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
} from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { uploadBuffer } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/:productId").get(getProductById);
router.route("/").get(getAllProducts);
// router.route("/categories/edit/:categeroyId").put(editCategoryById);

router.use(verifyJWT);
router.route("/add").post(uploadBuffer.single("image"), addProduct);

export default router;
