import { Router } from "express";

import {
  registerToEventController,
  unregisterFromEventController,
  getRegistrationsByEventController,
  getUserRegistrationsController, 
} from "../dependencies/dependencies";
import { authMiddleware } from "../../../middleware/auth.middleware";
import { requireRole } from "../../../middleware/role.middleware";

const router = Router();
router.get(
  "/my-registrations",
  authMiddleware,
  (req, res) => getUserRegistrationsController.handle(req, res)
);
// ---------------------------

router.post(
  "/:eventId/register",
  authMiddleware,
  requireRole("Voluntario", "Admin_cocina"),
  (req, res) => registerToEventController.handle(req, res)
);

router.delete(
  "/:eventId/unregister",
  authMiddleware,
  requireRole("Voluntario", "Admin_cocina"),
  (req, res) => unregisterFromEventController.handle(req, res)
);

router.get(
  "/:eventId/participants",
  authMiddleware,
  (req, res) => getRegistrationsByEventController.handle(req, res)
);

export default router;