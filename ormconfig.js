let dbConfig = {
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
    "extra": {
        "ssl": true,
        "rejectUnauthorized": false,
    }
}

if  (!process.env.LOCAL) {
    dbConfig.extra = {
        "ssl": true,
        "rejectUnauthorized": false,
    }
}

module.exports = dbConfig
