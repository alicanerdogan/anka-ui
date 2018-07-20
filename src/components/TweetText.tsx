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
`;

const AnchorTag = styled.a`
  display: inline;
`;

const Text = styled.span`
  display: inline;
  font-weight: 300;
  white-space: pre-wrap;
`;

export const Style = styled.div``;

export const TweetText: React.SFC<ITweetTextProps> = (
  props: ITweetTextProps
) => {
  const entities = getTextEntities(props.tweet);
  return (
    <Style>
      {entities.map((entity, id) => <TextEntity key={id} entity={entity} />)}
    </Style>
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
  if (entity.url) {
    return <AnchorTag href={entity.url}>{entity.text}</AnchorTag>;
  }
  return <Text>{entity.text}</Text>;
};
