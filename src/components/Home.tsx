import * as React from "react";
import styled from "react-emotion";
import { RouteComponentProps } from "react-router";
import Timeline from "./../containers/Timeline";
import { Style as TimelineStyle } from "./Timeline";

export interface IHomeProps extends RouteComponentProps<any, any> {
  children: JSX.Element;
}

const Style = styled("div")`
  position: relative;
  height: 100vh;

  ${TimelineStyle} {
    position: absolute;
    max-height: 100%;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

export const Home: React.SFC<IHomeProps> = (props: IHomeProps) => {
  return (
    <Style>
      <Timeline location={props.location} />
    </Style>
  );
};
