import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SkillsToWildersRate } from "./SkillsToWildersRate";

@Entity()
export class Skills {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => SkillsToWildersRate,
    (skillsToWildersRate) => skillsToWildersRate.skills,
    { eager: true, onDelete: "CASCADE" }
  )
  skillsToWildersRates: SkillsToWildersRate[];
}
