/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async knex => {
    // Deletes ALL existing entries
    await knex("dishes").del();
    await knex("dishes").insert([
        {
            id: 1,
            name: "黯然銷魂飯",
            image_url: "https://www.fanfanslife.com/pub/media/catalog/product/cache/23a6f8cf2d733c27f5ab8f0314d75dd2/f/i/file_66_24.jpg",
            price: 66,
        },
        {
            id: 2,
            name: "懷舊厚切餐肉煎雙蛋飯",
            image_url: "https://www.fanfanslife.com/pub/media/catalog/product/cache/23a6f8cf2d733c27f5ab8f0314d75dd2/f/i/file_66_19.jpg",
            price: 53,
        },
        {
            id: 3,
            name: "煎蛋免治牛肉飯",
            image_url: "https://www.fanfanslife.com/pub/media/catalog/product/cache/23a6f8cf2d733c27f5ab8f0314d75dd2/f/i/file_66_20.jpg",
            price: 56,
        },
        {
            id: 4,
            name: "香煎芙蓉蛋飯",
            image_url: "https://www.fanfanslife.com/pub/media/catalog/product/cache/23a6f8cf2d733c27f5ab8f0314d75dd2/f/i/file_77_87.jpg",
            price: 61,
        },
        {
            id: 5,
            name: "蒽油豬扒煎雙蛋飯",
            image_url: "https://www.fanfanslife.com/pub/media/catalog/product/cache/23a6f8cf2d733c27f5ab8f0314d75dd2/f/i/file_66_21.jpg",
            price: 63,
        },
        {
            id: 6,
            name: "超大雞扒飯",
            image_url: "https://www.fanfanslife.com/pub/media/catalog/product/cache/23a6f8cf2d733c27f5ab8f0314d75dd2/f/i/file_66_22.jpg",
            price: 63,
        },
        {
            id: 7,
            name: "超大雜扒飯",
            image_url: "https://www.fanfanslife.com/pub/media/catalog/product/cache/23a6f8cf2d733c27f5ab8f0314d75dd2/f/i/file_66_23.jpg",
            price: 66,
        },
    ]);
};
