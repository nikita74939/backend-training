import { Router } from "express";
import { 
  CLogin, 
  CCreateAdmin, 
  CUpdateAdmin, 
  CDeleteAdmin 
} from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validation.middleware";
import { 
  createAdminSchema, 
  updateAdminSchema, 
  loginSchema 
} from "../middlewares/validation.middleware";

const router = Router();

router.post("/login", validateRequest(loginSchema), CLogin);

router.post("/create", validateRequest(createAdminSchema), CCreateAdmin);

router.put("/:id", validateRequest(updateAdminSchema), CUpdateAdmin);

router.delete("/:id", CDeleteAdmin);

export default router;
