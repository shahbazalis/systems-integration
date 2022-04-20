import {
  writeOrdersDataToFile,
  removeDataFromFile,
  writeSystemJsonFile,
} from "./jsonFileOperations";
import { OrderData } from "../interfaces/OrderData";
import { Request, Response } from "express";
import axios from "axios";

export const addOrderData = async (req: Request, res: Response) => {
  try {
    const dataObject: OrderData = req.body;
    const orders = await writeOrdersDataToFile(dataObject);
    const keys = Object.keys(orders);

    if (orders[keys[0]].type.length === 3) {
      console.log(orders[keys[0]].type.length);
      const orderObj = {
        extOrderId: keys[0],
        fromLocation: orders[keys[0]].fromLocation,
        toLocation: orders[keys[0]].toLocation,
        cargoType: orders[keys[0]].cargoType,
        cargoAmount: orders[keys[0]].cargoAmount,
      };
      const order = await axios.post(
        "http://localhost:5000/orders/system",
        orderObj
      );
      if (order.status === 200) {
        removeDataFromFile();
      }
    }
    res.send(orders);
  } catch (e) {
    console.log("Adding order error", e);
  }
};

export const addingOrderToSystem = async (req: Request, res: Response) => {
  try {
    const dataObject: OrderData = req.body;
    const orders = await writeSystemJsonFile(dataObject);
    res.status(200).json(orders);
  } catch (e) {
    console.log("Adding order to system error", e);
  }
};
