import {Singleton} from "typescript-ioc";
import {Dish} from "../interfaces/Dish";
import {DrinkTemperature} from "../interfaces/DrinkTemperature";
import {Order} from "../interfaces/Order";
import {ObjectUtil} from "../utils/ObjectUtil";
import {db} from "../db";
import first from "lodash/first";

@Singleton
export class OrderService {
    async latestUnpaidOrder(userId: string): Promise<Order | null> {
        const orderData = await db("orders").where({user_id: userId, paid: false}).orderBy("created_at", "desc").first();

        if (!orderData) {
            return null;
        }

        return this.view(orderData);
    }

    async create(order: Omit<Order, "id">): Promise<Order> {
        const orderData = first(await db("orders").insert(this.data(order)).returning("*"));
        return this.view(orderData);
    }

    async pay(id: number) {
        await db("orders").where({id}).update({paid: true});
    }

    calculatePrice(dish: Dish, drinkTemperature: DrinkTemperature): number {
        return Number(dish.price) + (drinkTemperature === DrinkTemperature.HOT ? 0 : 3.0); // 凍飲加3蚊
    }

    view(data: any): Order {
        return ObjectUtil.toCamelKeys(data);
    }

    data(order: Partial<Order>): any {
        return ObjectUtil.toSnakeKeys(order);
    }
}
