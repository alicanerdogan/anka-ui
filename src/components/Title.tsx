import * as React from "react";

export interface ITitleProps {
  baseTitle: string;
  postTitle?: string;
}

export class Title extends React.Component<ITitleProps, {}> {
  componentDidMount() {
    document.title = this.getTitle();
  }

  componentDidUpdate(prevProps: ITitleProps) {
    if (prevProps.postTitle !== this.props.postTitle) {
      document.title = this.getTitle();
    }
  }

  getTitle(): string {
    const { baseTitle, postTitle } = this.props;
    return baseTitle + (postTitle ? ` - ${postTitle}` : "");
  }

  render(): JSX.Element {
    return null;
  }
}
