import { Request, Response } from "express";
import { GetUserRegistrationsUseCase } from "../../../application/use-cases/GetUserRegistrationsUseCase";

export class GetUserRegistrationsController {
  constructor(private useCase: GetUserRegistrationsUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const token = req.headers.authorization!;
      const registrations = await this.useCase.execute(token);

      return res.status(200).json({ 
        success: true, 
        data: registrations 
      });
    } catch (err: any) {
      return res.status(err.http_status || 500).json({
        success: false,
        message: err.message,
      });
    }
  }
}