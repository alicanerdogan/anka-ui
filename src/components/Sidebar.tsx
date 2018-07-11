import * as React from "react";
import styled, { css } from "react-emotion";
import { Link } from "react-router-dom";
import { media } from "../utils/styles";

import { Favorite } from "../assets/Favorite.svg";
import { Home } from "../assets/Home.svg";
import { Folder } from "../assets/Folder.svg";

const iconSrc = require("./../assets/icons/icon.svg");

const Icon = styled.img`
  display: block;
  width: 100%;
  padding: 16px 0;
  margin: 0 auto;
`;

const IconStyle = css`
  display: block;
  width: 100%;
  margin: 16px auto;
  color: #888;

  &:hover {
    fill: #408ecc;
    stroke-width: 0;
  }
`;

const StyledFavoriteIcon = styled(Favorite)`
  ${IconStyle};
`;

const StyledHomeIcon = styled(Home)`
  ${IconStyle};
`;

const StyledFolderIcon = styled(Folder)`
  ${IconStyle};
`;

const StyledLink = styled(Link)`
  display: block;
  &:hover {
    cursor: pointer;
  }
`;

const Links = styled.div`
  padding-top: 16px;
  height: 500px;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`;

export const SidebarStyle = styled.div`
  position: relative;
  height: calc(100vh - 48px);
  margin: 24px 16px;
  width: 64px;
  max-height: 100vh;
  border-radius: 3px;
  background: white;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);

  ${media.mobile`
    height: 100vh;
    width: 48px;
    margin: 0;
  `};
`;

export interface ISidebarProps {}

interface ISidebarState {}

export class Sidebar extends React.Component<ISidebarProps, ISidebarState> {
  constructor(props: ISidebarProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <SidebarStyle>
        <Icon src={iconSrc} />
        <Links>
          <StyledLink to="/">
            <StyledHomeIcon />
          </StyledLink>
          <StyledLink to="/likes">
            <StyledFavoriteIcon />
          </StyledLink>
          <StyledLink to="/lists">
            <StyledFolderIcon />
          </StyledLink>
        </Links>
      </SidebarStyle>
    );
  }
}
