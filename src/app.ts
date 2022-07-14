import express from "express";
import {Container} from "typescript-ioc";
import {OrderController} from "./order/OrderController";

const app = express();
const orderController = Container.get(OrderController);

app.use(express.json());

app.post("/webhook", async (req, res) => {
    const intent = req.body.queryResult.intent.displayName;

    switch (intent) {
        case "order":
            await orderController.order(req, res);
            break;
        case "pay":
            await orderController.pay(req, res);
            break;
    }
});

app.listen(5000, () => console.log("Cha Chaan Tang Bot listening on port 5000!"));
