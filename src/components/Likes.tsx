import * as React from "react";
import styled from "react-emotion";
import { RouteComponentProps } from "react-router";
import { Timeline, Style as TimelineStyle, ITimelineProps } from "./Timeline";
import { media } from "../utils/styles";
import { ITweet } from "../models/Tweet";

export const LikesStyle = styled("div")`
  position: relative;
  height: calc(100vh - 48px);
  margin: 24px;

  ${TimelineStyle} {
    position: absolute;
    max-height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 3px;
    background: white;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
      0 5px 15px 0 rgba(0, 0, 0, 0.08);
  }

  ${media.mobile`
    height: 100vh;
    margin: 0;
  `};
`;

export interface ILikesProps extends RouteComponentProps<any, any> {
  getLikes: (query: ITimelineQueryParams) => void;
  likes?: ITweet[];
}

export const Likes: React.SFC<ILikesProps> = (props: ILikesProps) => {
  const { getLikes, likes } = props;
  const timelineProps: ITimelineProps = {
    getTimeline: getLikes,
    timeline: likes
  };
  return (
    <LikesStyle>
      <Timeline {...timelineProps} />
    </LikesStyle>
  );
};
