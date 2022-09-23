import DataSource from "../utils";

import { Skills } from "../entities/Skills";

import { Request, Response } from "express";

export async function create(req: Request, res: Response): Promise<void> {
  const { name }: { name: string } = req.body;
  try {
    await DataSource.getRepository(Skills).save(req.body);
    res.status(201).send(`The skill ${name} has been created`);
  } catch (error) {
    res.status(500).send(`Error while creating wilder ${name}`);
  }
}

export async function read(req: Request, res: Response): Promise<void> {
  try {
    const data = await DataSource.getRepository(Skills).find();
    res.send(data);
  } catch (error) {
    res.status(500).send("Error while reading Skills");
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const { id, name }: { id: number; name: string } = req.body;
  try {
    await DataSource.createQueryBuilder()
      .update(Skills)
      .set({
        name,
      })
      .where("id = :id", { id })
      .execute();
    res.send(`The skill ${name} with the id ${id} has been updated`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error while updating the skill ${name}`);
  }
}

export async function deleteSkill(req: Request, res: Response): Promise<void> {
  const { name }: { name: string } = req.body;
  try {
    await DataSource.createQueryBuilder()
      .delete()
      .from(Skills)
      .where("name = :name", { name })
      .execute();
    res.send(`The skill with the name ${name} has been deleted succesfully`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error while deleting the wilder with the name ${name}`);
  }
}

const skillsController = {
  create,
  read,
  update,
  deleteSkill,
};

export default skillsController;
