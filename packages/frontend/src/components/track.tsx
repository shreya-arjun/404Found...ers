import React from "react";

interface TrackProps {
  title: string,
}

const Track: React.FC<TrackProps> = () => {
  return <div className="trackContainer"></div>;
};

export default Track;
