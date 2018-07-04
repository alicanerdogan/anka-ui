import * as React from "react";
import styled from "react-emotion";
import { last, sortBy } from "lodash-es";

import { IVideoInfo, VideoContentType } from "../models/Entity";

export interface IVideoPlayerProps {
  videoInfo: IVideoInfo;
}

export const VideoPlayerStyle = styled.div`
  max-width: 100vw;
  max-height: 100vh;
`;

export const VideoPlayer: React.SFC<IVideoPlayerProps> = (
  props: IVideoPlayerProps
) => {
  const mp4VideoVariant = last(
    sortBy(
      props.videoInfo.variants.filter(
        v => v.content_type === VideoContentType.MP4
      ),
      ["bitrate"]
    )
  );
  return (
    <VideoPlayerStyle>
      <video controls autoPlay width="100%">
        {mp4VideoVariant ? (
          <source
            src={mp4VideoVariant.url}
            type={mp4VideoVariant.content_type}
          />
        ) : (
          "This video cannot be not supported"
        )}
      </video>
    </VideoPlayerStyle>
  );
};
