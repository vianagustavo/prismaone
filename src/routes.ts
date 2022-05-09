import { response, Router } from "express";
import { AuthenticateUserController } from "./controllers/authenticateUserController";
import { CreateEnrollmentController } from "./controllers/createEnrollmentController";
import { CreateUserController } from "./controllers/createUserController";
import { GetEnrollmentInfo } from "./controllers/getEnrollmentInfo";
import { ListEnrollments } from "./controllers/listEnrollments";
import { ensureAuthenticated } from "./middlewares/ensureUserAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const listEnrollments = new ListEnrollments();
const getEnrollmentInfo = new GetEnrollmentInfo();
const createEnrollmentController = new CreateEnrollmentController();

router.get("/", () => {
  return response.json({
    ok: true
  });
});

router.post("/users", ensureAuthenticated, createUserController.handle);
router.post("/auth/user/login", authenticateUserController.handle);

router.get("/enrollments", ensureAuthenticated, listEnrollments.handle);
router.get(
  "/enrollments/:enrollment",
  ensureAuthenticated,
  getEnrollmentInfo.handle
);
router.post(
  "/enrollments/create",
  ensureAuthenticated,
  createEnrollmentController.handle
);

export { router };
