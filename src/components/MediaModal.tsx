import * as React from "react";
import styled from "react-emotion";

import { VideoPlayer } from "./VideoPlayer";
import { IMedia } from "../models/Entity";
import { media } from "../utils/styles";

export interface IMediaModalProps {
  items: IMedia[];
  isOpen: boolean;
  onCloseRequest: () => void;
  initialIndex?: number;
}

export const MediaModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: rgba(255, 255, 255, 0.8);
`;

const Container = styled.div`
  position: absolute;
  top: 48px;
  left: 48px;
  right: 48px;
  bottom: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.mobile`
    top: 16px;
    left: 16px;
    right: 16px;
    bottom: 16px;
  `};
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 3px;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
`;

interface IMediaModalState {
  index: number;
}

export class MediaModal extends React.Component<
  IMediaModalProps,
  IMediaModalState
> {
  constructor(props: IMediaModalProps) {
    super(props);

    this.state = { index: this.props.initialIndex || 0 };
  }

  componentWillReceiveProps(newProps: IMediaModalProps) {
    if (!this.props.isOpen && newProps.isOpen) {
      this.setState(state => ({ ...state, index: newProps.initialIndex || 0 }));
    }
  }

  onNext = () => {
    const count = this.props.items.length;
    this.setState(state => ({ ...state, index: (state.index + 1) % count }));
  };

  onPrevious = () => {
    const count = this.props.items.length;
    this.setState(state => ({ ...state, index: (state.index - 1) % count }));
  };

  onClose = () => {
    this.props.onCloseRequest();
  };

  onSupressClick = (ev: React.SyntheticEvent) => {
    ev.stopPropagation();
  };

  render(): JSX.Element {
    const { items, isOpen } = this.props;
    const { index } = this.state;

    if (!isOpen) {
      return null;
    }

    const currentItem = items[index];

    return (
      <MediaModalStyle onClick={this.onClose}>
        <Container>
          {currentItem.video_info ? (
            <VideoPlayer videoInfo={currentItem.video_info} />
          ) : (
            <Image
              onClick={this.onSupressClick}
              src={currentItem.media_url_https}
            />
          )}
        </Container>
      </MediaModalStyle>
    );
  }
}
