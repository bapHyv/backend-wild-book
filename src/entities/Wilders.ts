import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { SkillsToWildersRate } from "./SkillsToWildersRate";

@Entity()
export class Wilders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => SkillsToWildersRate,
    (skillsToWildersRate) => skillsToWildersRate.wilders,
    { eager: true, onDelete: "CASCADE" }
  )
  skillsToWildersRates: SkillsToWildersRate[];
}
