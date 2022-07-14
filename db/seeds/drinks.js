/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("drinks").del();
    await knex("drinks").insert([
        {id: 1, name: "檸茶"},
        {id: 2, name: "奶茶"},
        {id: 3, name: "咖啡"},
        {id: 4, name: "檸水"},
        {id: 5, name: "鴛鴦"},
        {id: 6, name: "好立克"},
        {id: 7, name: "阿華田"},
    ]);
};
