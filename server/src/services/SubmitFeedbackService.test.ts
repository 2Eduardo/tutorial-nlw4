import { SubmitFeedbackService } from "./SubmitFeedbackService"

describe('Submit feedback', () => {
  const createFeedbackSpy = jest.fn();
  const sendEmailSpy = jest.fn();

  const submitFeedbackService = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendMail: sendEmailSpy }
  );

  it('should be able to submit a feedback', async () => {
    await expect(submitFeedbackService.execute({
      type: "BUG",
      comment: "example comment",
      screenshot: "data:image/png;base64,justfortest"
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendEmailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(submitFeedbackService.execute({
      type: "",
      comment: "example comment",
      screenshot: "data:image/png;base64,justfortest"
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedbackService.execute({
      type: "BUG",
      comment: "",
      screenshot: "data:image/png;base64,justfortest"
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(submitFeedbackService.execute({
      type: "BUG",
      comment: "example comment",
      screenshot: "justfortest.jpg"
    })).rejects.toThrow();
  });
})