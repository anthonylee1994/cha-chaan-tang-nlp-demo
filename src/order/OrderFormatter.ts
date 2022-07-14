import {Inject, Singleton} from "typescript-ioc";
import {Order} from "../interfaces/Order";
import {Dish} from "../interfaces/Dish";
import {Drink} from "../interfaces/Drink";
import {DrinkTemperature} from "../interfaces/DrinkTemperature";
import {DialogflowUtil} from "../utils/DialogflowUtil";
import {DishService} from "../dish/DishService";
import {DrinkService} from "../drink/DrinkService";

@Singleton
export class OrderFormatter {
    constructor(
        @Inject
        private readonly dishService: DishService,
        @Inject
        private readonly drinkService: DrinkService
    ) {}

    async format(order: Order, dish?: Dish, drink?: Drink) {
        const orderDish = (dish || (await this.dishService.findById(order.dishId)))!;
        const orderDrink = (drink || (await this.drinkService.findById(order.drinkId)))!;

        return DialogflowUtil.cardResponse({
            title: `訂單編號: ${String(order.id).padStart(4, "0")}`,
            imageUri: orderDish.imageUrl,
            subtitle: this.orderDetail(order, orderDish, orderDrink),
        });
    }

    orderDetail(order: Order, dish: Dish, drink: Drink): string {
        const dishDescription = this.dishDescription(dish, order);
        const drinkDescription = this.drinkDescription(drink, order);

        const details: string[] = ["", "訂單內容：", dishDescription, drinkDescription, "---------------------------------", `總金額：$${order.price}`];

        return details.join("\n");
    }

    dishDescription(dish: Dish, order: Order) {
        let dishDescription = dish.name;
        if (order.dishRiceSize) {
            dishDescription += ` (${order.dishRiceSize})`;
        }

        dishDescription += ` $${dish.price}`;

        return dishDescription;
    }

    drinkDescription(drink: Drink, order: Order) {
        let drinkDescription = `${order.drinkTemperature}${drink.name}`;

        const specials: string[] = [];

        if (order.drinkSugar || order.drinkIce) {
            if (order.drinkSugar) {
                specials.push(order.drinkSugar);
            }
            if (order.drinkIce) {
                specials.push(order.drinkIce);
            }
            drinkDescription += ` (${specials.join("、")})`;
        }

        if (order.drinkTemperature == DrinkTemperature.COLD) {
            drinkDescription += "\n凍飲 +$3.00";
        }

        return drinkDescription;
    }
}
