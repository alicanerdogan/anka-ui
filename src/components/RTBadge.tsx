import * as React from "react";
import styled, { css } from "react-emotion";

export interface IRTBadgeProps {
  alias?: string;
}

export const RTBadgeStyle = styled.div`
  border-radius: 3px;
  border: solid 1px #ccc;
  background: #fff;
  display: inline-flex;
  align-content: center;
  overflow: hidden;
`;

const Triangle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="30px"
    viewBox="0 0 70 200"
    style={{ marginLeft: "-0.1px" }}
  >
    <path
      fill="#3490dc"
      d="M63.925,83.992c8.117,10.672,8.117,21.343,0,32.015L0,200.047V-0.047L63.925,83.992z"
    />
  </svg>
);

const StyledTriangle = styled(Triangle)`
  margin-left: -1px;
`;

const BaseTextStyle = css`
  display: inline-block;
  padding: 3px 8px;
  font-weight: 300;
`;

const Text = styled.span`
  ${BaseTextStyle};
`;

const RTText = styled.span`
  ${BaseTextStyle};
  background: #3490dc;
  color: white;
`;

export const RTBadge: React.SFC<IRTBadgeProps> = (props: IRTBadgeProps) => {
  return (
    <RTBadgeStyle>
      <RTText>{"RT"}</RTText>
      <StyledTriangle />
      <Text>{`@${props.alias}`}</Text>
    </RTBadgeStyle>
  );
};
