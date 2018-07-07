import * as React from "react";
import styled from "react-emotion";
import { IList } from "../../models/List";
import { WrapperLink } from "./WrapperLink";

export const ListBadgeStyle = styled.div`
  position: relative;
  border-radius: 3px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  background: white;
  padding: 16px;
  height: 100%;
  cursor: pointer;
`;

const Title = styled.h3`
  margin: 0;
  margin-bottom: 12px;
`;

const Description = styled.p`
  margin: 0;
  font-weight: 300;
`;

export interface IListBadgeProps {
  list: IList;
}

export const ListBadge: React.SFC<IListBadgeProps> = (
  props: IListBadgeProps
) => {
  return (
    <ListBadgeStyle>
      <Title>{props.list.name}</Title>
      <Description>{props.list.description}</Description>
      <WrapperLink to={`lists/${props.list.id_str}${window.location.search}`} />
    </ListBadgeStyle>
  );
};
