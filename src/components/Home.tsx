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
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  }
`;

export const Home: React.SFC<IHomeProps> = (props: IHomeProps) => {
  return (
    <Style>
      <Timeline location={props.location} />
    </Style>
  );
};
