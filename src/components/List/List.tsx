import * as React from "react";
import styled from "react-emotion";
import { RouteComponentProps } from "react-router";
import { Timeline, Style as TimelineStyle, ITimelineProps } from "../Timeline";
import { media } from "../../utils/styles";
import { ITweet } from "../../models/Tweet";
import { IList } from "../../models/List";

export const ListStyle = styled("div")`
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
  }

  ${media.mobile`
    height: 100vh;
    margin: 0;
  `};
`;

export interface IListProps extends RouteComponentProps<any, any> {
  getList: (query: ITimelineQueryParams) => void;
  list?: IList;
  tweets?: ITweet[];
}

export const List: React.SFC<IListProps> = (props: IListProps) => {
  const { getList, tweets } = props;
  const timelineProps: ITimelineProps = {
    getTimeline: getList,
    timeline: tweets,
    autoRefresh: true
  };
  return (
    <ListStyle>
      <Timeline {...timelineProps} />
    </ListStyle>
  );
};
