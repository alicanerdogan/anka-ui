import * as React from "react";
import styled, { css } from "react-emotion";

export interface IRTBadgeProps {
  alias?: string;
}

export const RTBadgeStyle = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 1px;
  overflow: hidden;
  background: #3490dc;
  color: white;
`;

const Text = styled.span`
  color: #3490dc;
  background: white;
  font-size: 14px;
  font-weight: 300;
  padding: 2px 6px;
`;

const RTText = styled.span`
  display: inline-block;
  font-weight: 500;
  font-size: 14px;
  padding: 2px 5px 2px 4px;
`;

export const RTBadge: React.SFC<IRTBadgeProps> = (props: IRTBadgeProps) => {
  return (
    <RTBadgeStyle>
      <RTText>{"RT"}</RTText>
      <Text>{`@${props.alias}`}</Text>
    </RTBadgeStyle>
  );
};
