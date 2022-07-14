import {Singleton} from "typescript-ioc";
import {ObjectUtil} from "../utils/ObjectUtil";
import {Drink} from "../interfaces/Drink";
import {db} from "../db";

@Singleton
export class DrinkService {
    async findById(id: number): Promise<Drink | null> {
        const drinkData = await db("drinks").where({id}).first();

        if (!drinkData) {
            return null;
        }

        return this.view(drinkData);
    }

    async findByName(name: string): Promise<Drink | null> {
        const drinkData = await db("drinks").where({name}).first();

        if (!drinkData) {
            return null;
        }

        return this.view(drinkData);
    }

    view(data: any): Drink {
        return ObjectUtil.toCamelKeys(data);
    }
}
