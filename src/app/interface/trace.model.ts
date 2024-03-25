import { Demande } from "./demande.model";
import { Profil } from "./profil.model";
import { User } from "./user.model";

export interface TraceDemande {
    id?: number;
    user?: User;
    demande?: Demande;
    profil?: Profil;
    dateAction: Date;
    decision: string;
    dataBefore: string;
    dataAfter: string;
    idUser?: number;
  }
  