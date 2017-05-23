export interface Tag {
  count: number;
  name: string;
  url: string;
}
export interface Tags {
  tag: Tag[];
  "@attr": {
    artist: string;
  }
}