import { Demande } from "./demande.model";

// status.model.ts
export interface Status {
  id?: number;
  demande?: Demande;
  codeStatus: number;
  nomStatus: string;
  description: string;
  raisonRefus?: string;
}
