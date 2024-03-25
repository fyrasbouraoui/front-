import { Demande } from "./demande.model";
import { User } from "./user.model";

export interface Profil {
    id?: number;
    user?: User;
    demande?: Demande;
    code: number;
    nomProfil: string;
  }