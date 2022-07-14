import {Inject, Singleton} from "typescript-ioc";
import {Request, Response} from "express";
import {DishService} from "../dish/DishService";
import {DialogflowUtil} from "../utils/DialogflowUtil";
import {ErrorMessage} from "../utils/ErrorMessage";
import {DrinkService} from "../drink/DrinkService";
import {UserService} from "../user/UserService";
import {OrderService} from "./OrderService";
import {OrderFormatter} from "./OrderFormatter";

@Singleton
export class OrderController {
    constructor(
        @Inject
        private readonly userService: UserService,
        @Inject
        private readonly dishService: DishService,
        @Inject
        private readonly drinkService: DrinkService,
        @Inject
        private readonly orderService: OrderService,
        @Inject
        private readonly orderFormatter: OrderFormatter
    ) {}

    async order(req: Request, res: Response) {
        const params = req.body.queryResult.parameters;
        const user = await this.userService.fromRequest(req);

        const dish = await this.dishService.findByName(params.Dish);
        const drink = await this.drinkService.findByName(params.Drink);
        if (!dish || !drink || !user || !params.DrinkTemperature) {
            // suppose dialogflow has prompt for dish and drink and drink temperature
            return res.json(DialogflowUtil.textResponse(ErrorMessage.SYSTEM_ERROR));
        }

        const latestUnpaidOrder = await this.orderService.latestUnpaidOrder(user.telegramId);

        if (latestUnpaidOrder) {
            return res.json(DialogflowUtil.textResponse(ErrorMessage.HAS_UNPAID_ORDER));
        }

        const order = await this.orderService.create({
            userId: user.telegramId,
            dishId: dish.id,
            drinkId: drink.id,
            dishRiceSize: params.DishRiceSize || null,
            drinkTemperature: params.DrinkTemperature,
            drinkSugar: params.DrinkSugar || null,
            drinkIce: params.DrinkIce || null,
            price: this.orderService.calculatePrice(dish, params.DrinkTemperature).toFixed(2),
            paid: false,
        });

        return res.json(await this.orderFormatter.format(order, dish, drink));
    }

    async pay(req: Request, res: Response) {
        const user = await this.userService.fromRequest(req);

        if (!user) {
            return res.json(DialogflowUtil.textResponse(ErrorMessage.SYSTEM_ERROR));
        }

        const latestUnpaidOrder = await this.orderService.latestUnpaidOrder(user.telegramId);

        if (!latestUnpaidOrder) {
            return res.json(DialogflowUtil.textResponse(ErrorMessage.NO_UNPAID_ORDER));
        }

        await this.orderService.pay(latestUnpaidOrder.id);

        return res.json(DialogflowUtil.textResponse(`畀錢啦，$${latestUnpaidOrder.price}！`));
    }
}
