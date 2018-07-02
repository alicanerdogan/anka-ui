import * as React from "react";
import styled from "react-emotion";

import { IMedia } from "./../models/Entity";
import { MediaModal } from "./MediaModal";

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
          <Image
            key={item.id_str}
            src={item.media_url_https}
            onClick={() => this.openModal(i)}
          />
        ))}
      </Style>
    );
  }
}
