import * as React from "react";
import styled from "react-emotion";
import { RouteComponentProps } from "react-router";
import Timeline from "./../containers/Timeline";
import Notification from "./../containers/Notification";
import { Style as TimelineStyle } from "./Timeline";
import { media } from "./../utils/styles";

export interface IHomeProps extends RouteComponentProps<any, any> {
  children: JSX.Element;
}

const Style = styled("div")`
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

export const Home: React.SFC<IHomeProps> = (props: IHomeProps) => {
  return (
    <Style>
      <Notification />
      <Timeline location={props.location} />
    </Style>
  );
};
