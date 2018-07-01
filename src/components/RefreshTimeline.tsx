import * as React from "react";

export interface IRefreshTimelineProps {
  getNewTimeline: (maxId: string) => void;
  sinceId: string;
}

export class RefreshTimeline extends React.Component<
  IRefreshTimelineProps,
  {}
> {
  componentDidMount() {
    setInterval(() => {
      const { getNewTimeline, sinceId } = this.props;
      getNewTimeline(sinceId);
    }, 120 * 1000);
  }

  render(): JSX.Element {
    return null;
  }
}
