import * as React from "react";
import styled from "react-emotion";

import { ITweet } from "../models/Tweet";
import { getTextEntities, ITextEntity } from "../utils/entityParser";

export interface ITweetTextProps {
  tweet: ITweet;
}

const Link = styled.a`
  display: inline;
`;

const Text = styled.span`
  display: inline;
  font-weight: 300;
  white-space: pre-wrap;
`;

export const Style = styled.div`
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
