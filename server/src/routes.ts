import express from "express";
import { PrismaFeedbackRepository } from "./repositories/prisma/PrismaFeedbackRepository";
import { SubmitFeedbackService } from "./services/SubmitFeedbackService";
import { NodemailerMailAdapter } from "./adapters/nodemailer/NodemailerMailAdapter";

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const submitFeedbackService = new SubmitFeedbackService(
    new PrismaFeedbackRepository(),
    new NodemailerMailAdapter()
  );

  try {
    await submitFeedbackService.execute(req.body);
  }
  catch (err) {
    return res.status(500).send();
  }

  return res.status(201).send();
});
