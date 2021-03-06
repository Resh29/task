import React from 'react';

export const Loader = ({ props }) => {
  return (
    <div className="loader">
      <div className={props?.size ? `preloader-wrapper ${props.size} active` : 'preloader-wrapper  active'}>
        <div className={props?.color ? `spinner-layer ${props.color}` : 'spinner-layer spinner-blue-only'}>
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
