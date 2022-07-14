// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: "postgresql",
        connection: {
            host: "localhost",
            port: 5432,
            database: "cha_chaan_tang",
            user: "postgres",
            password: "",
        },
        migrations: {
            directory: "./db/migrations",
            tableName: "knex_migrations",
        },
        seeds: {
            directory: "./db/seeds",
        },
    },

    production: {
        client: "postgresql",
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "./db/migrations",
            tableName: "knex_migrations",
        },
        seeds: {
            directory: "./db/seeds",
        },
    },
};
