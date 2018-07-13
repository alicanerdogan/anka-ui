import { ITweet } from "../models/Tweet";
import { Indices } from "../models/Entity";
import { substring, length } from "stringz";
import { unescape } from "lodash-es";

export enum TextEntityType {
  TEXT,
  MEDIA,
  URL,
  HASHTAG,
  SYMBOL,
  MENTION
}

export interface ITextEntity {
  type: TextEntityType;
  indices: Indices;
  text: string;
  url?: string;
}

function compareTextEntities(
  entity1: ITextEntity,
  entity2: ITextEntity
): number {
  if (entity1.indices[0] > entity2.indices[0]) {
    return 1;
  }
  if (entity1.indices[0] === entity2.indices[0]) {
    return 0;
  }
  return -1;
}

export function getTextEntities(tweet: ITweet): ITextEntity[] {
  const entities: ITextEntity[] = [];
  const text = tweet.text || tweet.full_text;

  tweet.entities.hashtags.forEach(hashtag =>
    entities.push({
      type: TextEntityType.HASHTAG,
      text: `#${hashtag.text}`,
      url: `/search?hashtag=${hashtag.text}`,
      indices: hashtag.indices
    })
  );

  tweet.entities.symbols.forEach(symbol =>
    entities.push({
      type: TextEntityType.SYMBOL,
      text: "SYMBOL_NOT_IMPLEMENTED",
      indices: symbol.indices
    })
  );

  tweet.entities.media &&
    tweet.entities.media.forEach(m =>
      entities.push({
        type: TextEntityType.MEDIA,
        text: m.display_url,
        url: m.expanded_url,
        indices: m.indices
      })
    );

  tweet.entities.urls.forEach(url =>
    entities.push({
      type: TextEntityType.URL,
      text: url.display_url,
      url: url.expanded_url,
      indices: url.indices
    })
  );

  tweet.entities.user_mentions.forEach(mention =>
    entities.push({
      type: TextEntityType.URL,
      text: `@${mention.screen_name}`,
      url: `/user/${mention.screen_name}`,
      indices: mention.indices
    })
  );

  entities.sort(compareTextEntities);

  const knownEntityCount = entities.length;

  for (let i = 0; i < knownEntityCount; i++) {
    const e = entities[i];
    if (i === 0) {
      const indices: Indices = [0, e.indices[0]];
      entities.push({
        type: TextEntityType.TEXT,
        indices,
        text: unescape(substring(text, indices[0], indices[1]))
      });
    } else {
      const indices: Indices = [entities[i - 1].indices[1], e.indices[0]];
      entities.push({
        type: TextEntityType.TEXT,
        indices,
        text: unescape(substring(text, indices[0], indices[1]))
      });
    }
    if (i === knownEntityCount - 1) {
      if (length(text) - 1 === e.indices[1]) {
        continue;
      }
      const indices: Indices = [e.indices[1], length(text)];
      entities.push({
        type: TextEntityType.TEXT,
        indices,
        text: unescape(substring(text, indices[0], indices[1]))
      });
    }
  }

  entities.sort(compareTextEntities);

  if (entities.length === 0) {
    entities.push({
      type: TextEntityType.TEXT,
      indices: [0, text.length - 1],
      text: unescape(text)
    });
  }

  return entities;
}
