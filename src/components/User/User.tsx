import * as React from "react";
import styled from "react-emotion";
import { IUser } from "../../models/User";
import { MapPin } from "../../assets/MapPin.svg";
import { Image, ImageStyle } from "../Image";
import { Stat, StatStyle } from "./Stat";
import { Spinner } from "../Spinner";
import { media } from "../../utils/styles";

export const UserStyle = styled.div`
  position: relative;
  height: calc(100vh - 48px);
  margin: 24px 16px;

  border-radius: 3px;
  background: white;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);

  ${media.mobile`
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 0;
    box-shadow: none;
    border-left: solid 1px #eee;
    height: 100vh;
    margin: 0;
  `};
`;

const UserCard = styled.div`
  padding: 24px;
  display: flex;

  ${media.mobile`
    padding: 12px;
  `};
`;

const LeftPanel = styled.div`
  ${ImageStyle} {
    height: 128px;
    width: 128px;
    border-radius: 3px;
    display: block;
    margin-right: 16px;
    overflow: hidden;

    ${media.mobile`
        height: 96px;
        width: 96px;
    `};
  }
`;

const UserInfo = styled.div``;

const Title = styled.div``;

const Name = styled.span`
  font-size: 24px;
  margin-right: 8px;
  ${media.mobile`
    font-size: 18px;
  `};
`;

const ScreenName = styled.span`
  font-size: 24px;
  margin-left: 8px;
  font-weight: 300;
  ${media.mobile`
    font-size: 18px;
  `};
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: 300;
  margin: 0;
  margin-bottom: 6px;
  ${media.mobile`
    font-size: 14px;
  `};
`;

const Location = styled.p`
  font-size: 18px;
  font-weight: 300;
  display: inline-flex;
  align-items: center;
  margin: 0;
  margin-left: 12px;
  color: #888;
  ${media.mobile`
    font-size: 16px;
  `};

  svg {
    margin-right: 2px;
    color: #888;
    width: 14px;
    height: 14px;
  }
`;

const StatContainer = styled.div`
  ${StatStyle} + ${StatStyle} {
    margin-left: 16px;
  }
`;

export interface IUserProps {
  user?: IUser;
  getUser: () => void;
}

export class User extends React.Component<IUserProps, {}> {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const { user } = this.props;

    return (
      <UserStyle>
        <Spinner ready={!!user}>
          {() => (
            <UserCard>
              <LeftPanel>
                <Image
                  src={user.profile_image_url_https.replace("_normal", "")}
                />
              </LeftPanel>
              <UserInfo>
                <Title>
                  <Name>{user.name}</Name>
                  {"·"}
                  <ScreenName>{"@" + user.screen_name}</ScreenName>
                  <Location>
                    <MapPin />
                    {user.location}
                  </Location>
                </Title>
                <StatContainer>
                  <Stat n={user.followers_count} label="followers" />
                  <Stat n={user.friends_count} label="following" />
                </StatContainer>
                <Description>{user.description}</Description>
              </UserInfo>
            </UserCard>
          )}
        </Spinner>
      </UserStyle>
    );
  }
}
