import * as React from "react";
import styled from "react-emotion";

import { ITweet } from "../models/Tweet";
import { getTextEntities, ITextEntity } from "../utils/entityParser";

export interface ITweetTextProps {
  tweet: ITweet;
}

const Link = styled.a``;

const Text = styled.span`
  font-weight: 300;
  margin-bottom: 0;
`;

export const Style = styled.div`
  ${Link} {
    display: inline;
  }
`;

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
  return entity.url ? (
    <Link href={entity.url}>{entity.text}</Link>
  ) : (
    <Text>{entity.text}</Text>
  );
};
