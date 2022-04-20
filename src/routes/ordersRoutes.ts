import express from "express";
import {
  addOrderData,
  addingOrderToSystem,
} from "../controllers/ordersController";
const router = express.Router();

router.post("/", addOrderData);
router.post("/system", addingOrderToSystem);

export default router;
