import { Profil } from "./profil.model";
import { Structure } from "./structure.model";

export interface User {
  idUser: number;
  structure?: Structure;
  profil?: Profil;
  cin: string;
  nom: string;
  prenom: string;
  email: string;
  mobile: number;
  password: string;
  grade: string;
  token?: string;
  nomProfil?: string;
  id: number;

}