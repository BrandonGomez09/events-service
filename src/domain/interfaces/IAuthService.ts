export interface IAuthService {
  getUserFromToken(token: string): Promise<{
    id: number;
    email: string;
    roles: string[];
    stateId: number | null;
    municipalityId: number | null;
  }>;


// AGREGAMOS ESTE MÉTODO:
  getUserById(userId: number, token: string): Promise<{
    names: string;
    firstLastName: string;
    secondLastName: string;
    email: string;
    phoneNumber: string;
  } | null>;
}