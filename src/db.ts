import knex from "knex";

export const db = knex(require("../knexfile")[process.env.NODE_ENV || "development"]);
