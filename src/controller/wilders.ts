import { Request, Response } from "express";

import DataSource from "../utils";
import { Wilders, Skills, SkillsToWildersRate } from "../entities/Entities";

async function create(req: Request, res: Response): Promise<void> {
  const { name }: { name: string } = req.body;
  try {
    await DataSource.getRepository(Wilders).save(req.body);
    res.status(201).send(`The wilder ${name} has been created`);
  } catch (error) {
    res.status(500).send(`Error while creating wilder ${name}`);
  }
}

async function read(req: Request, res: Response): Promise<void> {
  try {
    const data = await DataSource.getRepository(Wilders).find({
      relations: {
        skillsToWildersRates: {
          skills: true,
        },
      },
    });

    const formatedData = data.map((e) => {
      return {
        id: e.id,
        name: e.name,
        description: e.description,
        skills: e.skillsToWildersRates.map(
          (e: { skills: Skills; rate: number }) => {
            return {
              id: e.skills.id,
              name: e.skills.name,
              rate: e.rate,
            };
          }
        ),
      };
    });

    res.send(formatedData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error while reading wilders");
  }
}

async function getOneWilder(req: Request, res: Response): Promise<void> {
  const id: string = req.params.id;
  try {
    const data = await DataSource.getRepository(Wilders).findOne({
      where: {
        id: parseInt(id),
      },
      relations: {
        skillsToWildersRates: {
          skills: true,
        },
      },
    });
    if (data !== null) {
      const { id, name, description, skillsToWildersRates } = data;
      const formatedData = {
        id,
        name,
        description,
        skills: skillsToWildersRates.map((e) => {
          return {
            id: e.skills.id,
            name: e.skills.name,
            rate: e.rate,
          };
        }),
      };

      res.send(formatedData);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

async function update(req: Request, res: Response): Promise<void> {
  const {
    name,
    id,
    description,
  }: { name: string; id: number; description: string } = req.body;
  try {
    await DataSource.createQueryBuilder()
      .update(Wilders)
      .set({
        name,
        description,
      })
      .where("id = :id", { id })
      .execute();
    res.send(`The wilder ${name} with the id ${id} has been updated`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error while updating the wilder ${name}`);
  }
}

async function deleteWilder(req: Request, res: Response): Promise<void> {
  const { id }: { id: number } = req.body;
  try {
    await DataSource.createQueryBuilder()
      .delete()
      .from(Wilders)
      .where("id = :id", { id })
      .execute();
    res.send(`The wilder with the id ${id} has been deleted succesfully`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error while deleting the wilder with the id ${id}`);
  }
}

async function addRateToSkill(req: Request, res: Response): Promise<void> {
  const { name, skillName, rate } = req.body;
  try {
    const wilderToAdd = await DataSource.getRepository(Wilders).findOneBy({
      name,
    });

    const skillToAdd = await DataSource.getRepository(Skills).findOneBy({
      name: skillName,
    });

    if (wilderToAdd !== null && skillToAdd !== null) {
      const result = await DataSource.getRepository(SkillsToWildersRate).save({
        rate,
        skills: skillToAdd,
        wilders: wilderToAdd,
      });
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
}

const wildersController = {
  create,
  read,
  getOneWilder,
  update,
  deleteWilder,
  addRateToSkill,
};

export default wildersController;
