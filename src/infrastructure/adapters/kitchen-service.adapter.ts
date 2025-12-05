import axios from "axios";
import { IKitchenService } from "../../domain/interfaces/IKitchenService";

export class KitchenServiceAdapter implements IKitchenService {
  private client = axios.create({
    baseURL: process.env.KITCHEN_SERVICE_URL,
  });

  async getKitchenById(id: number, token?: string): Promise<any> {
    try {
      const config = token ? { headers: { Authorization: token } } : {};
      
      const response = await this.client.get(`/${id}`, config);
      
      const responseData = response.data.data;
      if (responseData && responseData.kitchen) {
        return responseData.kitchen;
      }

      return responseData;

    } catch (error: any) {
      console.error("❌ Error conectando a Kitchen Service:", error.response?.data || error.message);
      throw { http_status: 404, message: "Kitchen not found or access denied" };
    }
  }
}