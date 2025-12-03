import { Request, Response } from "express";
import { UpdateEventUseCase } from "../../../application/use-cases/UpdateEventUseCase";

export class UpdateEventController {
  constructor(private useCase: UpdateEventUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const token = req.headers.authorization!;
      const id = Number(req.params.id);
      const data = req.body;

      const event = await this.useCase.execute(token, id, data);

      return res.status(200).json({ success: true, data: event });
    } catch (err: any) {
      console.error("❌ Error en UpdateEventController:", err);

      return res.status(err.http_status || 500).json({
        success: false,
        message: err.message || "An error occurred",
        validations: err.validations || null 
      });
    }
  }
}