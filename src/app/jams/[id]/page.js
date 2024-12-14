import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WebcamRecorder from './WebcamRecorder';

const page = async ({ params }) => {
  const { id } = await params;
  const getJamData = async () => {
    //does data getting
  };

  return (
    <div>
      <div className="instruments ">
        <div>
          <h1>Strings</h1>
          {/* <FontAwesomeIcon icon='guitar' /> */}

          <WebcamRecorder />
        </div>
      </div>

      {id}
    </div>
  );
};

export default page;
