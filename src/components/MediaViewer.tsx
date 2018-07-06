import * as React from "react";
import styled from "react-emotion";

import { IMedia } from "../models/Entity";
import { MediaModal } from "./MediaModal";
import { PlayOverlay } from "./PlayOverlay";

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

const ImageContainer = styled.div`
  position: relative;
`;

interface IMediaViewerState {
  isModalOpen: boolean;
  focusedImageIndex?: number;
}

export class MediaViewer extends React.Component<
  IMediaViewerProps,
  IMediaViewerState
> {
  constructor(props: IMediaViewerProps) {
    super(props);

    this.state = { isModalOpen: false };
  }

  onCloseModalRequest = () =>
    this.setState(state => ({ ...state, isModalOpen: false }));

  openModal = (index: number) =>
    this.setState(state => ({
      ...state,
      isModalOpen: true,
      focusedImageIndex: index
    }));

  render() {
    const { items } = this.props;
    const { isModalOpen, focusedImageIndex } = this.state;
    return (
      <Style>
        <MediaModal
          items={items}
          isOpen={isModalOpen}
          onCloseRequest={this.onCloseModalRequest}
          initialIndex={focusedImageIndex}
        />
        {items.map((item, i) => (
          <ImageContainer key={item.id_str} onClick={() => this.openModal(i)}>
            {item.video_info && <PlayOverlay />}
            <Image src={item.media_url_https} />
          </ImageContainer>
        ))}
      </Style>
    );
  }
}
