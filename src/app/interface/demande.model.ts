export interface Demande {
    idDemande: number;
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
    user: any; // Assuming User interface is defined
    structure: any; // Assuming Structure interface is defined
    profil: any; // Assuming Profil interface is defined
    status: any[]; // Assuming Status interface is defined as an array
    traces: any[]; // Assuming TraceDemande interface is defined as an array
  }