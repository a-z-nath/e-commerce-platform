import { Router } from "express";
import {
  addCategory,
  // editCategoryById,
  getCategories,
  getCategoryById,
} from "../controllers/category.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(getCategories);
router.route("/:categoryId").get(getCategoryById);

router.use(verifyJWT);
router.route("/add").post(addCategory);
// router.route("/categories/edit/:categeroyId").put(editCategoryById);

export default router;
