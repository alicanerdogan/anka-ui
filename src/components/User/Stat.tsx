import * as React from "react";
import styled from "react-emotion";
import { tween } from "popmotion";
import { shortenNumber } from "../../utils/number";
import { media } from "../../utils/styles";

export interface IStatProps {
  n: number;
  label: string;
}

interface IStatState {
  n: number;
}

export const StatStyle = styled.div`
  display: inline-flex;
  align-items: first baseline;
`;

const Count = styled.span`
  display: block;
  font-size: 24px;
  margin-right: 4px;
  ${media.mobile`
    font-size: 18px;
  `};
`;

const Label = styled.span`
  display: block;
  font-size: 18px;
  font-weight: 300;
  color: #888;
  ${media.mobile`
    font-size: 14px;
  `};
`;

export class Stat extends React.Component<IStatProps, IStatState> {
  constructor(props: IStatProps) {
    super(props);

    this.state = { n: 0 };
  }

  componentDidMount() {
    tween({ to: this.props.n, duration: 1200 }).start((n: number) =>
      this.setState({ n: Math.round(n) })
    );
  }

  render() {
    const { label } = this.props;
    const { n } = this.state;
    return (
      <StatStyle>
        <Count>{shortenNumber(n)}</Count>
        <Label>{label}</Label>
      </StatStyle>
    );
  }
}
