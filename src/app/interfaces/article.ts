export interface Article {
  _id?: string;
  titre: string;
  contenu: string;
  auteur: string;
  media?: string;
  typeMedia?: 'image' | 'video' | null;
  dateCreation: Date;
  dateModification: Date;
}
