import * as React from "react";
import styled from "react-emotion";

import { ListBadge, ListBadgeStyle } from "./ListBadge";
import { PopUp, PopUpStyle } from "./PopUp";
import { IList } from "../../models/List";

export const ListsStyle = styled.div`
  display: flex;
  margin: 0 -20px;
  position: relative;
  height: 100vh;
  padding: 24px;

  ${PopUpStyle} {
    margin: 0 20px;
    width: ${100 / 3}%;
    height: 200px;
  }
`;

export interface IListsProps {
  lists?: IList[];
  getLists: () => void;
}

export class Lists extends React.Component<IListsProps, {}> {
  componentDidMount() {
    const { lists, getLists } = this.props;

    !lists && getLists();
  }

  render(): JSX.Element {
    const { lists } = this.props;

    if (!lists) {
      return null;
    }

    return (
      <ListsStyle>
        {lists.map(list => (
          <PopUp key={list.id_str}>
            <ListBadge list={list} />
          </PopUp>
        ))}
      </ListsStyle>
    );
  }
}
