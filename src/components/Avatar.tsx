import * as React from "react";
import styled from "react-emotion";

export interface IAvatarProps {
  profileImageUrl: string;
}

export const Style = styled("img")`
  width: 36px;
  height: 36px;
  border-radius: 2px;
  border: solid 1px #e5e5e5;
  background: #ddd;
`;

export const Avatar: React.SFC<IAvatarProps> = (props: IAvatarProps) => {
  return <Style src={props.profileImageUrl} />;
};
