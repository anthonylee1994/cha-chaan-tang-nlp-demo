import {Singleton} from "typescript-ioc";
import {ObjectUtil} from "../utils/ObjectUtil";
import {User} from "../interfaces/User";
import {Request} from "express";
import {db} from "../db";
import first from "lodash/first";

@Singleton
export class UserService {
    async fromRequest(req: Request): Promise<User | null> {
        return this.findOrUpdateBy(req.body.originalDetectIntentRequest.payload.data.from.id, req.body.originalDetectIntentRequest.payload.data.from.first_name);
    }

    async findOrUpdateBy(telegramId: string, name: string): Promise<User | null> {
        const userData = await db("users").where({telegram_id: telegramId}).first();

        if (userData) {
            await db("users").update({name}).where(this.data({telegramId}));
            return this.view(userData);
        } else {
            const newUser = first(await db("users").insert(this.data({telegramId, name})).returning("*"));
            return this.view(newUser);
        }
    }

    view(data: any): User {
        return ObjectUtil.toCamelKeys(data);
    }

    data(user: Partial<User>): any {
        return ObjectUtil.toSnakeKeys(user);
    }
}
