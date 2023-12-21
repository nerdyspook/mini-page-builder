import { useEffect } from 'react';

const DropArea = ({
  setSelectedElement,
  selectedElement,
  setElements,
  elements,
  openModal,
}) => {
  const handleDragOver = (e) => e.preventDefault();

  const handleClick = (e, element) => {
    e.stopPropagation();
    const newElement = { ...element, isNew: false };
    setSelectedElement(newElement);
  };

  const handleKeyDown = (e, element) => {
    if (e.key === 'Enter') {
      openModal();
    }

    if (e.key === 'Delete') {
      setElements((prev) =>
        prev.filter((each) => each.id !== selectedElement.id),
      );
    }
  };

  const handleOnDrop = (e) => {
    const elementType = e.dataTransfer.getData('blockElement');
    const elementId = e.dataTransfer.getData('blockElementId');

    const x = e.screenX;
    const y = e.screenY - 120; // pointer is pointing the top-left of the selected element

    const newElement = {
      isNew: true,
      x,
      y,
      className: '',
    };

    if (elementType === 'button' || selectedElement.type === 'button')
      newElement['className'] =
        'bg-[#0044C1] hover:bg-slate-600 text-white py-3 px-3';
    else if (elementType === 'input' || selectedElement.type === 'input')
      newElement['className'] = 'bg-white';

    if (elementId) {
      newElement['isNew'] = false;
      setSelectedElement({ ...selectedElement, ...newElement });
    } else {
      newElement['type'] = elementType;
      newElement['id'] = new Date().toISOString();
      setSelectedElement(newElement);
    }

    openModal();
  };

  const handleTouchEnd = (e) => {
    const x = Math.round(e.changedTouches[0].screenX);
    const y = Math.round(e.changedTouches[0].screenY);

    setSelectedElement((prev) => ({
      ...prev,
      x: prev.isDragging ? x - 50 : x - prev.x - 50,
      y: prev.isDragging ? y - 190 : y - prev.y - 190,
      isDragging: false,
      className:
        selectedElement.type === 'button'
          ? 'bg-[#0044C1] hover:bg-slate-600 text-white py-3 px-3'
          : selectedElement.type === 'input'
            ? 'bg-white'
            : '',
    }));

    openModal();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedElement]);

  return (
    <div
      className="h-screen w-full bg-[#F3F3F3] flex-1 relative overflow-auto"
      onDrop={handleOnDrop}
      onTouchEnd={handleTouchEnd}
      onDragOver={handleDragOver}
      onClick={() => {
        setSelectedElement({});
      }}
    >
      {elements.map((eachElement) => {
        const { type, text = 'some text', id } = eachElement;
        const DynamicElement = type;

        const handleDragStart = (event) => {
          setSelectedElement(eachElement);
          event.dataTransfer.setData(
            'blockElementId',
            eachElement.id.toString(),
          );
        };

        const handleTouchMove = (e) => {
          const x = Math.round(e.changedTouches[0].screenX);
          const y = Math.round(e.changedTouches[0].screenY);
          setSelectedElement({
            ...eachElement,
            x,
            y,
            isNew: false,
            isDragging: true,
          });
        };

        const customStyle = {
          position: 'absolute',
          top: eachElement.y,
          left: eachElement.x,
          fontSize: `${eachElement.fontSize ?? 16}px`,
          fontWeight: eachElement.fontWeight ?? 400,
        };

        if (type === 'input')
          return (
            <DynamicElement
              type="text"
              key={id}
              id={id}
              placeholder="Enter text here"
              className="border-solid border-2 px-3"
              style={customStyle}
              draggable
              onDragStart={handleDragStart}
              onClick={(e) => handleClick(e, eachElement)}
              onTouchMove={handleTouchMove}
            />
          );
        return (
          <DynamicElement
            key={id}
            id={id}
            className={`${eachElement.className} ${
              selectedElement.id === eachElement.id
                ? 'border-solid border-2 border-red-500'
                : ''
            }`}
            style={customStyle}
            draggable
            onDragStart={handleDragStart}
            onClick={(e) => handleClick(e, eachElement)}
            onTouchMove={handleTouchMove}
          >
            {text}
          </DynamicElement>
        );
      })}
    </div>
  );
};

export default DropArea;
