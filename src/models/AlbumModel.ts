export class AlbumModel {
  albumType?: string;
  artists?: Artist[];
  externalUrls?: ExternalUrls;
  idSpotify?: string;
  images?: Image[];
  name?: string;
  releaseDate?: string;
  type?: string;
  value?: number;
}

type Artist = {
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

type ExternalUrls = {
  externalUrls: _ExternalUrls;
}

type _ExternalUrls = {
  spotify: string;
}

type Image = {
  height: number;
  url: string;
  width: number;
}