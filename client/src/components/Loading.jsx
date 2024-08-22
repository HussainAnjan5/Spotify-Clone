import React from 'react';
import './Loading.scss';
import loadingSvg from '../assets/loading.svg';
import { Link } from 'react-router-dom';

const Loading = ({ main = false, fullHeight = false }) => {
  return (
    <div className={`loading ${fullHeight && 'full-height'}`}>
      <img src={loadingSvg} alt="Loading spinner" />
      {main && (
        <>
          <p>
            If you are new,&nbsp;
            <Link to="signup">please sign up here</Link>
          </p>
          <p className="note">
            ☝🏻 Please note that authentication may take a few minutes. As the
            server spins down a free web service that goes 15 minutes without
            receiving inbound traffic, it takes some time to start.
          </p>
        </>
      )}
    </div>
  );
};

export default Loading;
