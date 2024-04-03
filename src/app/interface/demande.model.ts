// demande.model.ts
import { Profil } from "./profil.model";
import { Status } from "./status.model";
import { Structure } from "./structure.model";
import { TraceDemande } from "./trace.model";
import { User } from "./user.model";
import { Api } from "./api.model"; 

export interface Demande {
    idDemande?: number; // Add the id property
    user?: User;
    structure?: Structure;
    profil?: Profil;
    statuses?: Status[]; // Change nomStatus to statuses
    traces?: TraceDemande[];
    api?: Api;
    etablissementDemandeur: string;
    etablissementFournisseur: string;
    etablissementProprietaire: string;
    nomAPI: string;
    descriptionAPI: string;
    cadreAPI: string;
    donneesEntree: string;
    donneesDeSortie: string;
    impact: string;
    nomHebergeur: string;
    hebergeurSitueTunisie: boolean | null; // Assuming this could be true, false, or not provided
    paysHebergeur: string | null; // Optional, can be empty
    applicationPublieInternet: boolean | null; // Assuming this could be true, false, or not provided
    nomDomaineApplication: string | null; // Optional, can be empty
    adressesIPServeurs: string | null; // Optional, can be empty
    typeConnexionCNI: string | null; // Optional, can be empty
    nombreEstimeAppelsAn: number;
    nombreEstimeAppelsMin: number;
    besoinInvoquerAPIEnMasse: boolean | null; // Assuming this could be true, false, or not provided
    nomResponsableCNI: string | null; // Optional, can be empty
    adresseMailProfessionnelleResponsableCNI: string | null; // Optional, can be empty
    numeroTelephoneResponsableCNI: string | null; // Optional, can be empty
    nomResponsable: string | null; // Optional, can be empty
    adresseMailProfessionnelleResponsable: string | null; // Optional, can be empty
    numeroTelephoneResponsable: string | null; // Optional, can be empty
}
