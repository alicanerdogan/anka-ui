import * as React from "react";
import styled from "react-emotion";

import { IMedia } from "../models/Entity";
import { PlayOverlay, PlayOverlayStyle } from "./PlayOverlay";
import { Image, ImageStyle } from "./Image";

export interface IMediaViewerProps {
  items: IMedia[];
  onMediaClick?: (items: IMedia[], index: number) => void;
}

export const Style = styled("div")`
  display: flex;
  overflow: hidden;
  height: 160px;

  ${ImageStyle} {
    margin-right: 8px;
    background: #ddd;
    border: solid 1px #c3c4c5;
    border-radius: 2px;
  }

  ${PlayOverlayStyle} {
    height: 160px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
`;

function getOptimizeImageMetadata(
  media: IMedia
): { src: string; width: string; height: string } {
  const height = 160;
  const width = 160;
  const fitSize = media.sizes.small;

  if (!fitSize || fitSize.resize !== "fit") {
    return {
      src: media.media_url_https,
      height: `${height}px`,
      width: `${width}px`
    };
  }

  return {
    src: `${media.media_url_https}:small`,
    height: `${height}px`,
    width: `${fitSize.w * (height / fitSize.h)}px`
  };
}

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
            <Image {...getOptimizeImageMetadata(item)} />
          </ImageContainer>
        ))}
      </Style>
    );
  }
}
