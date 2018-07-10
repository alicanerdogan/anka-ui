import * as React from "react";
import styled from "react-emotion";

import { IMedia } from "../models/Entity";
import { PlayOverlay, PlayOverlayStyle } from "./PlayOverlay";

export interface IMediaViewerProps {
  items: IMedia[];
  onMediaClick?: (items: IMedia[], index: number) => void;
}

const Image = styled("img")`
  max-width: 100%;
  height: 160px;
  border: solid 1px #ccc;
  border-radius: 3px;
`;

export const Style = styled("div")`
  display: flex;

  ${Image} {
    margin-right: 8px;
  }

  ${PlayOverlayStyle} {
    height: 160px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
`;

export class MediaViewer extends React.Component<IMediaViewerProps, {}> {
  onMediaClick = (index: number) => {
    const { items, onMediaClick } = this.props;
    onMediaClick && onMediaClick(items, index);
  };

  render() {
    const { items } = this.props;
    return (
      <Style>
        {items.map((item, i) => (
          <ImageContainer
            key={item.id_str}
            onClick={() => this.onMediaClick(i)}
          >
            {item.video_info && <PlayOverlay />}
            <Image src={item.media_url_https} />
          </ImageContainer>
        ))}
      </Style>
    );
  }
}
