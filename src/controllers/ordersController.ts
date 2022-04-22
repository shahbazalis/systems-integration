import { jsonFileOperationsObj } from "./jsonFileOperations";
import { OrderData } from "../interfaces/OrderData";
import { Request, Response } from "express";
import axios from "axios";

export const addOrderData = async (req: Request, res: Response) => {
  try {
    const dataObject: OrderData = req.body;
    const orders = await jsonFileOperationsObj.writeIntegrationJsonFile(
      dataObject
    );
    const keys = Object.keys(orders);
    res.status(200).json(orders);
    if (
      orders[keys[0]].type.length === 3 &&
      orders[keys[0]].type.includes("from") &&
      orders[keys[0]].type.includes("to") &&
      orders[keys[0]].type.includes("cargo")
    ) {
      const orderObj = {
        extOrderId: keys[0],
        fromLocation: orders[keys[0]].fromLocation,
        toLocation: orders[keys[0]].toLocation,
        cargoType: orders[keys[0]].cargoType,
        cargoAmount: orders[keys[0]].cargoAmount,
      };
      try {
        const order = await axios.post(
          "http://localhost:5000/orders/system",
          orderObj
        );
        if (order.status === 200) {
          jsonFileOperationsObj.removeDataFromFile();
        }
      } catch (e) {
        console.log("Adding order to the system error", e);
      }
    } else if (orders[keys[0]].type.length === 3) {
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
