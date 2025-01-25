import { Options, Sequelize } from "sequelize";
import config from "config/config.json" with { type: "json" };

const env = process.env.NODE_ENV || "development";
if (env != "development" && env != "test" && env != "production") {
  throw new Error(`The env ${env} is not known`);
}

const sequelize = config[env].url
  ? new Sequelize(config[env].url, config[env] as Options)
  : new Sequelize(
      config[env].database,
      config[env].username,
      config[env].password ?? undefined,
      config[env] as Options,
    );

export { Sequelize, sequelize };
