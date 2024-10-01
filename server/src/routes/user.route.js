import { Router } from "express";
import {
  registerUser,
  signinUser,
  signoutUser,
  refreshAccessToken,
  chnagePassword,
  deleteUser,
  getUserById,
  getUsers,
  updateAccountDetails,
  changeAvatar,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { uploadBuffer } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/signin").post(signinUser);
router.route("/refresh-token").post(refreshAccessToken);

router.use(verifyJWT);

router.route("/signout").post(signoutUser);
router.route("/change-password").patch(chnagePassword);
router.route("/update-account").patch(updateAccountDetails);
router.route("/:userId").get(getUserById);
router.route("/:userId").delete(deleteUser);
router.route("/").get(getUsers);
router.route("/avatar").patch(uploadBuffer.single("avatar"), changeAvatar);
export default router;

// Testing completed
