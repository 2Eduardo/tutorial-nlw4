import { IMailAdapter } from "../adapters/IMailAdapter";
import { IFeedbackRepository } from "../repositories/IFeedbackRepository";

interface SubmitFeedbackServiceParams {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackService {
  private repository: IFeedbackRepository;
  private mailAdapter: IMailAdapter;

  constructor(repository: IFeedbackRepository, mailAdapter: IMailAdapter) {
    this.repository = repository;
    this.mailAdapter = mailAdapter;
  }

  async execute(params: SubmitFeedbackServiceParams) {
    const { type, comment, screenshot } = params;

    if (!type) {
      throw new Error("Type is missing and it is required.");
    }

    if (!comment) {
      throw new Error("Comment is missing and it is required.");
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error("Invalid screenshot format.");
    }

    await this.repository.create({
      type,
      comment,
      screenshot
    });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src=${screenshot} />` : '',
        '</div>'
      ].join('\n')
    });
  }
}