export interface IResponseTopArtists {
  artists: IArtists
}

export interface IArtists {
  artist: IArtist[]
  "@attr": IAttr
}

export interface IArtist {
  name: string
  playcount: string
  listeners: string
  mbid: string
  url: string
  streamable: string
  image: IImage[]
}

export interface IImage {
  "#text": string
  size: string
}

export interface IAttr {
  page: string
  perPage: string
  totalPages: string
  total: string
}