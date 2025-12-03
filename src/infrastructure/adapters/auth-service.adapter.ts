import axios from "axios";
import { IAuthService } from "../../domain/interfaces/IAuthService";

export class AuthServiceAdapter implements IAuthService {
  private client = axios.create({
    baseURL: process.env.AUTH_SERVICE_URL,
  });

  async getUserFromToken(token: string): Promise<any> {
    try {

      const cleanToken = token.replace("Bearer ", "");
      const response = await this.client.post("/api/v1/auth/validate-token", {
        token: cleanToken
      });

      if (!response.data.data.isValid || !response.data.data.user) {
        throw new Error("Token invalid");
      }

      return response.data.data.user;
      
    } catch (error: any) {
      console.error("Auth Service Error:", error.response?.data || error.message);
      throw { http_status: 401, message: "Invalid or expired token" };
    }
  }
}