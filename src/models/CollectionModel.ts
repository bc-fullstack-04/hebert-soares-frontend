import { AlbumModel } from "./AlbumModel";

export interface CollectionModel {
  id: string;
  name: string;
  albums: AlbumModel[];
}