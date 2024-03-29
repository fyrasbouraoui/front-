// demande.model.ts
import { Profil } from "./profil.model";
import { Status } from "./status.model";
import { Structure } from "./structure.model";
import { TraceDemande } from "./trace.model";
import { User } from "./user.model";

export interface Demande {
    idDemande?: number; // Add the id property
    user?: User;
    structure?: Structure;
    profil?: Profil;
    statuses?: Status[]; // Change nomStatus to statuses
    traces?: TraceDemande[];
    reference: number;
    description: string;
    nomApp: string;
    hebergeurApp: string;
    publie: boolean;
    nomDomaineApp: string;
    adresseIpApp: string;
    typeConnexion: string;
    nombreAppelAn: number;
    nombreAppelMin: number;
    invoMasse: boolean;
    paysHebergeur: string;
    dateInvMasse: Date;
    raisonInMasse: string;
    dateCreation: Date;
    dateModification: Date;
}
