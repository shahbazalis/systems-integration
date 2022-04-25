import app from "../index";
import request from "supertest";
import 
jsonFileOperationsObj 
 from "../controllers/jsonFileOperations";

const bc ={aa:jsonFileOperationsObj.writeCompanySystemJsonFile};
jest.mock("../controllers/jsonFileOperations");


// jest.mock("../controllers/jsonFileOperations", () => ({
//   // bc["aa"]: jest.fn(),
//     wwriteIntegrationJsonFile: jest.fn()
// }));


describe("APIs endpoint", () => {
  it("Hello World API Request", async () => {
    const result = await request(app).get("/");
    expect(result.text).toEqual("Hello World!");
    expect(result.statusCode).toEqual(200);
  });

  it("Add order to the system", async () => {
    const mockedOrderJson = [{
        "bda73cd4-30a0-40e5-bd0b-2bc3c907be47": {
          "type": ["from","to","cargo"],
          "fromLocation": "Porvoo",
          "toLocation": "Kokkola",
          "cargoType": "Pasta",
          "cargoAmount": 100,
        },
      }];
      const functionNameMock = jest.fn();
      jest.spyOn(jsonFileOperationsObj, "writeCompanySystemJsonFile").mockImplementation(functionNameMock);
     
      //writeCompanySystemJsonFile.mockImplementation(() => mockedOrderJson);
    const result = await request(app).post("/orders/system").send(mockedOrderJson);
    expect(result.statusCode).toEqual(200);
  });
});
