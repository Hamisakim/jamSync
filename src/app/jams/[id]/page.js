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
          <WebcamRecorder jamId={jamId} />

          <h1>Strings</h1>

          <div className="w-80">
            {/* {allVideos.map((video) => (
              // <VideoPlayer key={video} url={video} />
              null
            ))} */}


            {/* {filteredTracks.map((track) => (
              <VideoPlayer key={track.id} track={track} />
            ))} */}
          </div>

          {/* <VideoPlayer /> */}
        </div>
      </div>

    </div>
  );
};

export default page;
