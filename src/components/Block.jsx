import Grip from './../assets/grip-vertical.svg?react';

const Block = ({
  elementType,
  setSelectedElement,
  selectedElement,
  openModal,
}) => {
  const handleDragStart = (event, type) => {
    event.dataTransfer.setData('blockElement', type); // adding metadata to event
  };

  const handleTouchStart = (event) => {
    const newElement = {
      id: new Date().toISOString(),
      type: elementType.toLowerCase(),
      isNew: true,
      x: 0,
      y: 0,
      className: '',
    };

    setSelectedElement(newElement);
  };

  return (
    <li
      className="flex items-center py-2 md:py-4 rounded mb-2 bg-white w-full cursor-grab"
      draggable
      onTouchStart={handleTouchStart}
      onDragStart={(e) => handleDragStart(e, elementType.toLowerCase())}
    >
      <Grip className="w-8" />
      <p className="text-base">{elementType}</p>
    </li>
  );
};

export default Block;
