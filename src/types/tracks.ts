export interface IResponseTopTracks {
  tracks: ITracks
}

export interface ITracks {
  track: ITrack[]
  "@attr": IAttr
}

export interface ITrack {
  name: string
  duration: string
  playcount: string
  listeners: string
  mbid: string
  url: string
  streamable: IStreamable
  artist: IArtist
  image: IImage[]
}

export interface IStreamable {
  "#text": string
  fulltrack: string
}

export interface IArtist {
  name: string
  mbid: string
  url: string
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
