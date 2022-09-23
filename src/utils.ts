import { DataSource } from "typeorm";
import { Wilders, Skills, SkillsToWildersRate } from "./entities/Entities";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  synchronize: true,
  entities: [Wilders, Skills, SkillsToWildersRate],
});

export default AppDataSource;
