import React from 'react';

const LocationLink = ({children, className = null}) => {
  if (!className) {
    className = 'my-3 block';
  }
  className += 'flex gap-1 font-semibold underline';
  return (
    <a
      className={className}
      target="_blank"
      href={'https://maps.google.com/?q=' + children}>
      {children}
    </a>
  );
};

export default LocationLink;
