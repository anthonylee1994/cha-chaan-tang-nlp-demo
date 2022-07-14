import {Singleton} from "typescript-ioc";
import {Dish} from "../interfaces/Dish";
import {ObjectUtil} from "../utils/ObjectUtil";
import {db} from "../db";

@Singleton
export class DishService {
    async findById(id: number): Promise<Dish | null> {
        const dishData = await db("dishes").where({id}).first();

        if (!dishData) {
            return null;
        }

        return this.view(dishData);
    }

    async findByName(name: string): Promise<Dish | null> {
        const dishData = await db("dishes").where({name}).first();

        if (!dishData) {
            return null;
        }

        return this.view(dishData);
    }

    view(data: any): Dish {
        return ObjectUtil.toCamelKeys(data);
    }
}
