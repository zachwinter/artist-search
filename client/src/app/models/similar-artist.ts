import { Tag } from '../models/tags';

export interface SimilarArtist {
  name: string;
  mbid: string;
  match: string;
  url: string;
  image: Object[];
  tags: Tag[];
}