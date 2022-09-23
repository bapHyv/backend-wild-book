import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Wilders } from "./Wilders";
import { Skills } from "./Skills";

@Entity()
export class SkillsToWildersRate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rate: number;

  @ManyToOne(() => Wilders, (wilders) => wilders.skillsToWildersRates, {
    cascade: true,
    onDelete: "CASCADE",
  })
  wilders: Wilders;

  @ManyToOne(() => Skills, (skills) => skills.skillsToWildersRates, {
    cascade: true,
    onDelete: "CASCADE",
  })
  skills: Skills;
}
