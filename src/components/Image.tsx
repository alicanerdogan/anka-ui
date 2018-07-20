import * as React from "react";
import styled from "react-emotion";

export interface IImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {}

interface IImageState {
  loading: boolean;
}

export const ImageStyle = styled.div`
  display: inline-block;
  position: relative;
`;

export const ImagePlaceholder = styled.div<{ loading: boolean }>`
  display: ${props => (!props.loading ? "none" : "block")};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ddd;
`;

export const Img = styled.img<{ loading: boolean }>`
  display: ${props => (props.loading ? "none" : "block")};
  height: 100%;
`;

export class Image extends React.Component<IImageProps, IImageState> {
  timer: number;

  constructor(props: IImageProps) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentWillReceiveProps(newProps: IImageProps) {
    if (this.props.src !== newProps.src) {
      this.setState({ loading: true });
    }
  }

  onImgLoad = () => this.setState({ loading: false });

  render() {
    const { loading } = this.state;
    const { width, height, ...rest } = this.props;
    return (
      <ImageStyle style={{ width, height }}>
        <ImagePlaceholder loading={loading} />
        <Img loading={loading} {...rest} onLoad={this.onImgLoad} />
      </ImageStyle>
    );
  }
}
