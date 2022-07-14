/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
    await knex.schema.createTable("orders", table => {
        table.increments();
        table.string("user_id").index().references("telegram_id").inTable("users").notNullable();
        table.integer("dish_id").index().references("id").inTable("dishes").notNullable();
        table.enum("dish_rice_size", ["少飯", "多飯", "半飯"]).index().nullable();
        table.enum("drink_temperature", ["凍", "熱"]).index().notNullable();
        table.integer("drink_id").index().references("id").inTable("drinks");
        table.enum("drink_sugar", ["少甜", "走甜"]).index().nullable();
        table.enum("drink_ice", ["少冰", "多冰", "走冰"]).index().nullable();
        table.decimal("price").notNullable();
        table.boolean("paid").defaultTo(false).index();
        table.timestamps(false, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
    await knex.schema.dropTable("orders");
};
