import { Router } from "express";
import { AuthenticateUserController } from "./controllers/authenticateUserController";
import { CreateUserController } from "./controllers/createUserController";
import { GetEnrollmentInfo } from "./controllers/getEnrollmentInfo";
import { ListEnrollments } from "./controllers/listEnrollments";
import { ensureAuthenticated } from "./middlewares/ensureUserAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const listEnrollments = new ListEnrollments();
const getEnrollmentInfo = new GetEnrollmentInfo();

router.post("/users", ensureAuthenticated, createUserController.handle);
router.post("/auth/user/login", authenticateUserController.handle);
router.post("/students", ensureAuthenticated);
router.get("/enrollments", ensureAuthenticated, listEnrollments.handle);
router.get(
  "/enrollments/:enrollment",
  ensureAuthenticated,
  getEnrollmentInfo.handle
);

export { router };
