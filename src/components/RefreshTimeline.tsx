import * as React from "react";

export interface IRefreshTimelineProps {
  getTimeline: (query: { maxId?: string; sinceId?: string }) => void;
  sinceId?: string;
}

export class RefreshTimeline extends React.Component<
  IRefreshTimelineProps,
  {}
> {
  timerHandle: any;

  componentDidMount() {
    this.timerHandle = setInterval(() => {
      const { getTimeline, sinceId } = this.props;
      getTimeline({ sinceId });
    }, 90 * 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timerHandle);
  }

  render(): JSX.Element {
    return null;
  }
}
