import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PlaylistCard from './PlaylistCard';

const DraggableCard = ({ playlist, index, moveCard }) => {
  const [, ref] = useDrag({
    type: 'CARD',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'CARD',
    hover: (item) => {
      if (item.index !== index) moveCard(item.index, index);
    },
  });

  return (
    <div ref={(node) => drop(ref(node))} className="p-2">
      <PlaylistCard playlist={playlist} />
    </div>
  );
};

const DraggableGrid = ({ playlists, moveCard }) => (
  <DndProvider backend={HTML5Backend}>
    <div className="grid grid-cols-3 gap-4">
      {playlists.map((playlist, index) => (
        <DraggableCard
          key={index}
          playlist={playlist}
          index={index}
          moveCard={moveCard}
        />
      ))}
    </div>
  </DndProvider>
);

export default DraggableGrid;
