import * as React from "react";
import styled from "react-emotion";
import { RouteComponentProps } from "react-router";
import Timeline from "../containers/Timeline";
import Notification from "../containers/Notification";
import { Style as TimelineStyle } from "./Timeline";
import { media } from "../utils/styles";

export interface IHomeProps extends RouteComponentProps<any, any> {
  children: JSX.Element;
}

export const Style = styled("div")`
  position: relative;
  height: calc(100vh - 48px);
  margin: 24px 16px;

  ${TimelineStyle} {
    position: absolute;
    max-height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  ${media.mobile`
    height: 100vh;
    margin: 0;
  `};
`;

export const Home: React.SFC<IHomeProps> = (props: IHomeProps) => {
  return (
    <Style>
      <Notification />
      <Timeline location={props.location} />
    </Style>
  );
};
