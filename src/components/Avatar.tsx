import * as React from "react";
import styled from "react-emotion";

export interface IAvatarProps {
  profileImageUrl: string;
}

export const Style = styled("img")`
  width: 48px;
  height: 48px;
  border-radius: 3px;
`;

export const Avatar: React.SFC<IAvatarProps> = (props: IAvatarProps) => {
  return <Style src={props.profileImageUrl} />;
};
