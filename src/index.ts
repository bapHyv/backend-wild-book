import controllers from "./controller/controllers";
import express, { Request, Response } from "express";
import cors from "cors";
import DataSource from "./utils";

const { wildersController, skillsController, ratingController } = controllers;

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

/* CRUD wilder */
app.post("/api/wilder", wildersController.create);
app.get("/api/wilder", wildersController.read);
app.get("/api/wilder/:id", wildersController.getOneWilder);
app.put("/api/wilder", wildersController.update);
app.delete("/api/wilder", wildersController.deleteWilder);

/* CRUD skill */
app.post("/api/skill", skillsController.create);
app.get("/api/skill", skillsController.read);
app.put("/api/skill", skillsController.update);
app.delete("/api/skill", skillsController.deleteSkill);

/* ADD rate to skill */
app.put("/api/wilder/addRateToSkill", wildersController.addRateToSkill);

/* DELETE RATING SKILL */
app.delete("/api/ratingSkill", ratingController.deleteRating);

const start = async (): Promise<void> => {
  await DataSource.initialize();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

// app.use(function(req: Request, res: Response, next: NextFunction) {
//   res.status(404).send('Sorry cant find that!');
// });

void start();
