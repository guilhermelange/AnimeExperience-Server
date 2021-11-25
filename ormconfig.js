const dbConfig = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "entities": [
        process.env.ORM_ENTITIES,
    ],
    "migrations": [
        process.env.ORM_MIGRATIONS,
    ],
    "cli": {
        "migrationsDir": "./src/database/migrations"
    },
    "extra": process.env.ORM_SSL ? JSON.parse(process.env.ORM_SSL) : {}
}

module.exports = dbConfig;
