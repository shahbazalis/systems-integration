import jsonFileOperationsObj from "./jsonFileOperations";
import { OrderData } from "../interfaces/OrderData";
import { Request, Response } from "express";
import axios from "axios";

export const addOrderData = async (req: Request, res: Response) => {
  try {
    const dataObject: OrderData = req.body;
    const orders = await jsonFileOperationsObj.writeIntegrationJsonFile(
      dataObject
    );
    res.status(200).json(orders);
    if (
      orders.type.length === 3 &&
      orders.type.includes("from") &&
      orders.type.includes("to") &&
      orders.type.includes("cargo")
    ) {
      const orderObj = {
        extOrderId: orders.extOrderId,
        fromLocation: orders.fromLocation,
        toLocation: orders.toLocation,
        cargoType: orders.cargoType,
        cargoAmount: orders.cargoAmount,
      };
      try {
        const order = await axios.post(
          "http://localhost:5000/orders/system",
          orderObj
        );
      } catch (e) {
        console.log("Adding order to the system error", e);
      }
    } else if (orders.type.length === 3) {
      console.log("Does not contain proper type");
      jsonFileOperationsObj.removeDataFromFile();
    }
  } catch (e) {
    console.log("Adding order error", e);
  }
};

export const addingOrderToSystem = async (req: Request, res: Response) => {
  try {
    const dataObject: OrderData = req.body;
    const orders = await jsonFileOperationsObj.writeCompanySystemJsonFile(
      dataObject
    );
    res.status(200).json(orders);
  } catch (e) {
    console.log("Adding order to system error", e);
  }
};
