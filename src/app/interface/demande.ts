export interface Demande {
    id: number;
    // Ajoutez ici les autres propriétés de la demande en fonction de votre modèle
    nomApp: string;
    hebergeurApp: string;
    reference: string;
    description: string;
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
}
