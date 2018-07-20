import * as React from "react";
import styled from "react-emotion";
import posed from "react-pose";

export interface INotificationProps {
  tweetCount?: number;
  onDismiss?: () => void;
}

interface INotificationState {
  dismissed: boolean;
}

const NotificationContainer = styled.div<{ hidden: boolean }>`
  display: ${props => (props.hidden ? "none" : "flex")};
  position: fixed;
  z-index: 5;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
`;

export const NotificationStyle = styled(
  posed.div({
    hidden: {
      opacity: 0,
      y: -30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        y: {
          duration: 400,
          type: "tween",
          ease: "backOut"
        }
      }
    }
  })
)`
  position: relative;
  background-color: #ffffff;
  width: 400px;
  margin-top: 8px;
  padding: 8px 6px 12px;
  text-align: center;
  font-weight: 300;
  border-radius: 0 0 3px 3px;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  border-top: solid 4px #3490dc;
`;

const HighlightText = styled(
  posed.span({
    default: {
      scaleX: 1,
      scaleY: 1
    },
    pop: {
      scaleX: 1,
      scaleY: 1,
      transition: {
        default: {
          from: 1,
          to: 1,
          stiffness: 50,
          velocity: 30,
          damping: 50,
          duration: 500,
          type: "spring"
        }
      }
    }
  })
)`
  display: inline-block;
`;

export class Notification extends React.Component<
  INotificationProps,
  INotificationState
> {
  constructor(props: INotificationProps) {
    super(props);

    this.state = {
      dismissed: false
    };
  }

  componentWillReceiveProps(newProps: INotificationProps) {
    if (newProps.tweetCount !== this.props.tweetCount) {
      this.setState(state => ({ ...state, dismissed: false }));
    }
  }

  onDismiss = () => {
    this.setState(state => ({ dismissed: !state.dismissed }));

    const { onDismiss } = this.props;
    onDismiss && onDismiss();
  };

  render(): JSX.Element {
    const { dismissed } = this.state;
    const { tweetCount } = this.props;

    return (
      <NotificationContainer hidden={dismissed || !tweetCount}>
        <NotificationStyle
          pose={dismissed || !tweetCount ? "hidden" : "visible"}
          onClick={this.onDismiss}
        >
          <HighlightText pose="pop" poseKey={tweetCount}>
            {tweetCount}
          </HighlightText>
          {" New Tweets"}
        </NotificationStyle>
      </NotificationContainer>
    );
  }
}
