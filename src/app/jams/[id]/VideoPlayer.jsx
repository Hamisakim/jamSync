import { getTrack } from '@/utils/firebase/queries';
import React from 'react';

const VideoPlayer = async ({url}) => {

  return (
    <div>
      <video
        controls
        src={url}
        className="w-full rounded-lg"
      />
    </div>
  );
};

export default VideoPlayer;
