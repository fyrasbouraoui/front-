import { Demande } from "./demande.model";
import { Profil } from "./profil.model";
import { User } from "./user.model";

export interface Structure {
    idstr?: number;
    code: number;
    email: string;
    telStr: number;
    adresse: number;
    role: string;
    user?: User;
    demandes?: Demande[];
    profil?: Profil;
  }
  