import * as React from "react";
import styled from "react-emotion";

import { IMedia } from "./../models/Entity";

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

    return (
      <MediaModalStyle onClick={this.onClose}>
        <Container>
          <Image
            onClick={this.onSupressClick}
            src={items[index].media_url_https}
          />
        </Container>
      </MediaModalStyle>
    );
  }
}
