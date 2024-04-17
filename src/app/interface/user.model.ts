import { Profil } from "./profil.model";
import { Structure } from "./structure.model";

export interface User {
  idUser: number;
  code: number;
  structure?: Structure;
  profil?: Profil;
  cin: string;
  nom: string;
  prenom: string;
  email: string;
  mobile: string;
  password: string;
  grade: string;
  token?: string;
  nomProfil?: string;
  id: number;

}