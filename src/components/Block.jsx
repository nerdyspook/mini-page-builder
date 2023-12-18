import Grip from './../assets/grip-vertical.svg?react';

const Block = ({ elementType }) => {
  const handleDragStart = (event, type) => {
    event.dataTransfer.setData('blockElement', type); // adding metadata to event
  };

  return (
    <li
      className="flex items-center py-4 rounded mb-2 bg-white w-full cursor-grab"
      draggable
      onDragStart={(e) => handleDragStart(e, elementType.toLowerCase())}
    >
      <Grip className="w-8" />
      <p className="text-base">{elementType}</p>
    </li>
  );
};

export default Block;
