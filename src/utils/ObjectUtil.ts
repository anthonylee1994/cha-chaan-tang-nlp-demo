import mapKeys from "lodash/mapKeys";
import camelCase from "lodash/camelCase";
import snakeCase from "lodash/snakeCase";

const toCamelKeys = (obj: any): any => mapKeys(obj, (v, k) => camelCase(k));
const toSnakeKeys = (obj: any): any => mapKeys(obj, (v, k) => snakeCase(k));

export const ObjectUtil = Object.freeze({
    toCamelKeys,
    toSnakeKeys,
});
