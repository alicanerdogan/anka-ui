export interface IUserEntities {
  url: IUrlEntities;
}

export interface IUrlEntities {
  urls: IUrlEntity[];
  description: IUrlEntity[];
}

export interface IUrlEntity {
  url: string;
  expanded_url: string;
  display_url: string;
  indices: Indices;
}

export type Indices = [number, number];

export interface IHashtag {
  text: string;
  indices: Indices;
}
export interface ISymbol {
  indices: Indices;
}

export interface IUserMention {
  screen_name: string;
  name: string;
  id: number;
  id_str: string;
  indices: Indices;
}
export interface IUrl {
  indices: Indices;
  url: string;
  expanded_url: string;
  display_url: string;
}

export enum MediaType {
  PHOTO = "photo"
}
export enum ResizeType {
  FIT = "fit",
  CROP = "crop"
}
export interface ISize {
  w: number;
  h: number;
  resize: ResizeType | any;
}
export interface ISizes {
  medium: ISize;
  thumb: ISize;
  small: ISize;
  large: ISize;
}

export interface IMedia {
  id: number;
  id_str: string;
  indices: Indices;
  media_url: string;
  media_url_https: string;
  url: string;
  display_url: string;
  expanded_url: string;
  type: MediaType | any;
  sizes: ISizes;
  video_info?: IVideoInfo;
}

export type AspectRatio = [number, number];

export enum VideoContentType {
  MP4 = "video/mp4",
  MPEG = "application/x-mpegURL"
}

export interface IVideoVariant {
  bitrate?: number;
  content_type: VideoContentType;
  url: string;
}

export interface IVideoInfo {
  aspect_ratio: AspectRatio[];
  duration_millis: number;
  variants: IVideoVariant[];
}

export interface ITweetEntities {
  hashtags: IHashtag[];
  symbols: ISymbol[];
  user_mentions: IUserMention[];
  urls: IUrl[];
  media?: IMedia[];
}

export interface ITweetExtendedEntities {
  media: IMedia[];
}
