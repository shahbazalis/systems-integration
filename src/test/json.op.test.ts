import { jsonFileOperationsObj } from "../controllers/jsonFileOperations";

describe("JSON file operations", () => {
  test("read json op file", async () => {
    const mockedOrderJson =
      '{"extOrderId": "bda73cd4-30a0-40e5-bd0b-2bc3c907be47","type": "to","toLocation": "Kokkola"}';
    jsonFileOperationsObj.readIntegrationJsonFile = jest
      .fn()
      .mockImplementationOnce(() => mockedOrderJson);
    const expectedOrderData = {
      extOrderId: "bda73cd4-30a0-40e5-bd0b-2bc3c907be47",
      type: "to",
      toLocation: "Kokkola",
    };
    const result: any = jsonFileOperationsObj.readIntegrationJsonFile();
    const readData = JSON.parse(result);
    expect(readData).toEqual(expectedOrderData);
  });

  test("write json op file", async () => {
    const mockedOrderJson = {
      extOrderId: "bda73cd4-30a0-40e5-bd0b-2bc3c907be47",
      type: "from",
      fromLocation: "Porvoo",
    };

    jsonFileOperationsObj.writeIntegrationJsonFile = jest
      .fn()
      .mockImplementationOnce(() => mockedOrderJson);

    const expectedOrderData = {
      extOrderId: "bda73cd4-30a0-40e5-bd0b-2bc3c907be47",
      type: "from",
      fromLocation: "Porvoo",
    };
    const result =
      jsonFileOperationsObj.writeIntegrationJsonFile(mockedOrderJson);
    expect(result).toEqual(expectedOrderData);
  });
});
