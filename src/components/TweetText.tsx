import * as React from "react";
import styled from "react-emotion";
import { Link } from "react-router-dom";

import { ITweet } from "../models/Tweet";
import {
  getTextEntities,
  ITextEntity,
  TextEntityType
} from "../utils/entityParser";

export interface ITweetTextProps {
  tweet: ITweet;
}

const StyledLink = styled(Link)`
  display: inline;
  color: black;
  text-decoration: none;
  font-weight: 400;
  font-size: 15px;

  &:hover {
    color: #3f8ecc;
  }
`;

const AnchorTag = styled.a`
  display: inline;
  color: black;
  text-decoration: none;
  font-weight: 400;
  font-size: 15px;

  &:hover {
    color: #3f8ecc;
  }
`;

const Text = styled.span`
  display: inline;
  font-weight: 300;
  white-space: pre-wrap;
  font-size: 15px;
`;

export const TweetTextStyle = styled.div``;

export const TweetText: React.SFC<ITweetTextProps> = (
  props: ITweetTextProps
) => {
  const entities = getTextEntities(props.tweet);
  return (
    <TweetTextStyle>
      {entities.map((entity, id) => (
        <TextEntity key={id} entity={entity} />
      ))}
    </TweetTextStyle>
  );
};

interface ITextEntityProps {
  entity: ITextEntity;
}

const TextEntity: React.SFC<ITextEntityProps> = (props: ITextEntityProps) => {
  const { entity } = props;
  if (entity.type === TextEntityType.MENTION) {
    return <StyledLink to={entity.url}>{entity.text}</StyledLink>;
  }
  if (entity.type === TextEntityType.LINE_BREAK) {
    return <br />;
  }
  if (entity.url) {
    return <AnchorTag href={entity.url}>{entity.text}</AnchorTag>;
  }
  return <Text>{entity.text}</Text>;
};
