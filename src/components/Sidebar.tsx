import * as React from "react";
import styled from "react-emotion";
import { Link } from "react-router-dom";

const iconSrc = require("./../assets/icons/icon.svg");
const homeSrc = require("./../assets/home.svg");
const favoriteSrc = require("./../assets/favorite.svg");
const folderSrc = require("./../assets/folder.svg");

const Icon = styled.img`
  display: block;
  width: 48px;
  height: 80px;
  padding: 16px 0;
  margin: 0 auto;
`;

const LinkIcon = styled.img`
  display: block;
  width: 32px;
  height: 48px;
  padding: 12px 0;
  margin: 0 auto;
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
  margin: 24px 16px;
  width: 64px;
  max-height: 100vh;
  border-radius: 3px;
  background: white;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
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
          <StyledLink to="/timeline">
            <LinkIcon src={homeSrc} />
          </StyledLink>
          <StyledLink to="/likes">
            <LinkIcon src={favoriteSrc} />
          </StyledLink>
          <StyledLink to="/lists">
            <LinkIcon src={folderSrc} />
          </StyledLink>
        </Links>
      </SidebarStyle>
    );
  }
}
