import * as React from "react";
import styled from "react-emotion";

import { IMedia } from "./../models/Entity";

export interface IMediaViewerProps {
  items: IMedia[];
}

const Image = styled("img")`
  max-width: 100%;
  max-height: 160px;
  border: solid 1px #ccc;
  border-radius: 3px;
`;

export const Style = styled("div")`
  display: flex;

  ${Image} {
    margin-right: 8px;
  }
`;

export const MediaViewer: React.SFC<IMediaViewerProps> = (
  props: IMediaViewerProps
) => {
  const { items } = props;
  return (
    <Style>
      {items.map(item => (
        <Image key={item.id_str} src={item.media_url_https} />
      ))}
    </Style>
  );
};
