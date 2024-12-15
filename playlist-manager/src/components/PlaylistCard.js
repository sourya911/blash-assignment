import React from 'react';

const PlaylistCard = ({ playlist }) => {
  return (
    <div className="border p-4 rounded shadow">
      <img
        src={playlist.thumbnail}
        alt={playlist.name}
        className="w-full h-32 object-cover rounded"
      />
      <h3 className="mt-2 text-lg font-bold">{playlist.name}</h3>
      <p className="text-gray-600">Videos: {playlist.videoCount}</p>
      <a
        href={playlist.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline mt-2 block"
      >
        Watch Video
      </a>
    </div>
  );
};

export default PlaylistCard;
