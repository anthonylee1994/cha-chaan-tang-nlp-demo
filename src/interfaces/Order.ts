import {DishRiceSize} from "./DishRiceSize";
import {DrinkTemperature} from "./DrinkTemperature";
import {DrinkIce} from "./DrinkIce";
import {DrinkSugar} from "./DrinkSugar";

export interface Order {
    id: number;
    userId: string;
    dishId: number;
    drinkId: number;
    dishRiceSize?: DishRiceSize;
    drinkTemperature: DrinkTemperature;
    drinkSugar?: DrinkSugar;
    drinkIce?: DrinkIce;
    price: string;
    paid: boolean;
}
