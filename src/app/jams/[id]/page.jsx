
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WebcamRecorder from './WebcamRecorder';
import VideoPlayer from './VideoPlayer';
import {
  getTrack,
  getTracksByJamId,
  getVideos,
} from '@/utils/firebase/queries';
import { getVideosByJamId } from '@/utils/firebase/queries';
import MultiVideoPlayer from './MultiVideoPlayer';

const page = async ({ params }) => {
  const { id } = await params;
  const jamId = id;
  console.log('🚀 ~ file: page.js:14 ~ page ~ jamId:', jamId);

  // const tracks = await getTracksByJamId(jamId);

  // const allTracks = await getTrack();
  // const filteredTracks = allTracks.filter((track) => track.jamId === jamId);
  // const filteredTracks = allTracks.filter((track) => track.jamId.id === jamId);

  // const allVideos = await getVideos();

  const videos = await getVideosByJamId(jamId);

  console.log('🚀 ~ file: page.js:28 ~ page ~ videos:', videos);

  return (
    <div>
      <div className="instruments ">
        <div>
          <div>
            <div className="w-full grid grid-cols-3 gap-4">
              <MultiVideoPlayer videos={videos} jamId={jamId} />
              <WebcamRecorder jamId={jamId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
