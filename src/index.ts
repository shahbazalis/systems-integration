import express from "express";
import ordersRoutes from "./routes/ordersRoutes";
import { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/orders", ordersRoutes);

app.listen(PORT, () => {
  console.log("Started");
});

export default app;