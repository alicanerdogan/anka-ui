import * as React from "react";
import Measure, { ContentRect } from "react-measure";

export interface IAutoSizerProps {
  children: (height: number) => JSX.Element;
}

interface IAutoSizerState {
  currentHeight: number;
}

export class AutoSizer extends React.Component<
  IAutoSizerProps,
  IAutoSizerState
> {
  constructor(props: IAutoSizerProps) {
    super(props);

    this.state = {
      currentHeight: 0
    };
  }

  onResize = (contentRect: ContentRect) =>
    this.setState(state => ({
      ...state,
      currentHeight: contentRect.bounds.height
    }));

  render() {
    const { currentHeight } = this.state;
    const { children } = this.props;
    return (
      <Measure bounds={true} onResize={this.onResize}>
        {({ measureRef }) => (
          <div ref={measureRef} style={{ height: "100%" }}>
            {currentHeight !== 0 && children(currentHeight)}
          </div>
        )}
      </Measure>
    );
  }
}
