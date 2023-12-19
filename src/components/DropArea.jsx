const DropArea = ({
  setSelectedElement,
  selectedElement,
  elements,
  openModal,
}) => {
  const handleDragOver = (e) => e.preventDefault();
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

  return (
    <div
      className="h-screen w-full bg-[#F3F3F3] flex-1 relative"
      onDrop={handleOnDrop}
      onDragOver={handleDragOver}
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
              className="border-solid border-2"
              style={customStyle}
              draggable
              onDragStart={handleDragStart}
            />
          );
        return (
          <DynamicElement
            key={id}
            id={id}
            className={eachElement.className}
            style={customStyle}
            draggable
            onDragStart={handleDragStart}
          >
            {text}
          </DynamicElement>
        );
      })}
    </div>
  );
};

export default DropArea;
