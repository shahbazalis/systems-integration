import fs from "fs";

import path from "path";
import { OrderData } from "../interfaces/OrderData";
import { ModifiedOrderObject } from "../interfaces/ModifiedOrderObject";

const JSON_FILE_NAME = "../../ordersData.json";
const JSON_SYSTEM_FILE = "../../systemData.json";

export const jsonFileOperationsObj = {
  readIntegrationJsonFile: async () => {
    try {
      const orders = await fs.readFileSync(
        path.resolve(__dirname, JSON_FILE_NAME),
        "utf8"
      );
      return orders;
    } catch (e) {
      console.log("error reading from json file", e);
    }
  },
  writeJsonFile: async (orders: ModifiedOrderObject) => {
    const ordersJson = JSON.stringify(orders);
    await fs.writeFile(
      path.resolve(__dirname, JSON_FILE_NAME),
      ordersJson,
      "utf8",
      function (err) {
        if (err) throw err;
        else {
          return ordersJson;
        }
      }
    );
  },
  writeIntegrationJsonFile: async (orders: OrderData) => {
    try {
      const orderDetail = await jsonFileOperationsObj.readIntegrationJsonFile();
      if (!orderDetail) {
        const orderDataObj: ModifiedOrderObject = {};
        orderDataObj[orders.extOrderId] = {
          type: [orders.type],
          fromLocation: orders.fromLocation ? orders.fromLocation : "",
          toLocation: orders.toLocation ? orders.toLocation : "",
          cargoType: orders.cargoType ? orders.cargoType : "",
          cargoAmount: orders.cargoAmount ? orders.cargoAmount : "",
        };
        await jsonFileOperationsObj.writeJsonFile(orderDataObj);
        return orderDataObj;
      } else {
        const orderDataObj = JSON.parse(orderDetail);
        const keys = Object.keys(orderDataObj);
        if (keys[0] === orders.extOrderId) {
          orderDataObj[keys[0]].type.push(orders.type);
          orders.fromLocation
            ? (orderDataObj[keys[0]].fromLocation = orders.fromLocation)
            : orderDataObj[keys[0]].fromLocation;
          orders.toLocation
            ? (orderDataObj[keys[0]].toLocation = orders.toLocation)
            : orderDataObj[keys[0]].toLocation;
          orders.cargoType
            ? (orderDataObj[keys[0]].cargoType = orders.cargoType)
            : orderDataObj[keys[0]].cargoType;
          orders.cargoAmount
            ? (orderDataObj[keys[0]].cargoAmount = orders.cargoAmount)
            : orderDataObj[keys[0]].cargoAmount;

          await jsonFileOperationsObj.writeJsonFile(orderDataObj);
          return orderDataObj;
        }
      }
    } catch (e) {
      console.log("error writing to json file", e);
    }
  },
  readCompanySystemJsonFile: async () => {
    try {
      const orders = await fs.readFileSync(
        path.resolve(__dirname, JSON_SYSTEM_FILE),
        "utf8"
      );
      return orders;
    } catch (e) {
      console.log("error reading from json file", e);
    }
  },
  writeCompanySystemJsonFile: async (orders: OrderData) => {
    let result: any = await jsonFileOperationsObj.readCompanySystemJsonFile();
    let orderObj = JSON.parse(result);
    orderObj.push(orders);
    const ordersJson = JSON.stringify(orderObj);
    await fs.writeFile(
      path.resolve(__dirname, JSON_SYSTEM_FILE),
      ordersJson,
      "utf8",
      function (err) {
        if (err) throw err;
        else {
          console.log("file updated");
          return ordersJson;
        }
      }
    );
  },
  removeDataFromFile: async () => {
    await fs.truncate(path.resolve(__dirname, JSON_FILE_NAME), 0, function () {
      console.log("done");
    });
  },
};
