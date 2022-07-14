/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
    await knex.schema.createTable("dishes", table => {
        table.increments();
        table.string("name").notNullable();
        table.string("image_url").nullable();
        table.decimal("price").notNullable();
        table.index("name");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
    await knex.schema.dropTable("dishes");
};
