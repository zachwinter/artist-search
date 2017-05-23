export interface Artist {
  type: string;
  name: string;
  listeners: number;
  images: string[];
  tags: string[],
  summary: string;
  similar: Object
}