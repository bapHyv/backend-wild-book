import DataSource from "../utils";

import { Request, Response } from "express";
import { SkillsToWildersRate } from "../entities/Entities";

export async function deleteRating(req: Request, res: Response): Promise<void> {
  const { wilderId, skillId }: { wilderId: number; skillId: number } = req.body;
  try {
    await DataSource.createQueryBuilder()
      .delete()
      .from(SkillsToWildersRate)
      .where("wildersId = :wilderId", { wilderId })
      .andWhere("skillsId = :skillId", { skillId })
      .execute();
    res.send(
      `The rating with the wilderId ${wilderId} and the skillId ${skillId} has been deleted succesfully`
    );
  } catch (error) {
    res
      .status(500)
      .send(`Error while deleting the rating with the wilderId ${wilderId}`);
  }
}

const ratingController = {
  deleteRating,
};

export default ratingController;
