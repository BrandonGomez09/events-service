export interface IKitchenService {
  getKitchenById(kitchenId: number, token?: string): Promise<{
    id: number;
    ownerId: number;
    contactEmail?: string;
    contactPhone?: string;
  }>;
}