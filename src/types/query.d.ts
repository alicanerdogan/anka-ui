interface ITimelineQueryParams {
  sinceId?: string;
  maxId?: string;
}

interface ITimelineExtendedQueryParams extends ITimelineQueryParams {
  accessToken: string;
}
