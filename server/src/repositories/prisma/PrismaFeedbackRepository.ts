import { FeedbackCreateData, IFeedbackRepository } from "../IFeedbackRepository";
import { prisma } from "../../prisma";

export class PrismaFeedbackRepository implements IFeedbackRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    });
  }
}
