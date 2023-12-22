import { useState } from 'react';
import { toTitleCase } from '../utils';
import CrossIcon from './../assets/times.svg?react';

const Modal = ({
  setSelectedElement,
  selectedElement,
  setElements,
  closeModal,
}) => {
  const isInputElement = selectedElement.type === 'input';
  const [elementData, setElementData] = useState({
    text: selectedElement.text ?? '',
    x: selectedElement.x ?? '',
    y: selectedElement.y ?? '',
    fontSize: selectedElement.fontSize ?? '',
    fontWeight: selectedElement.fontWeight ?? '',
  });

  const handleSave = () => {
    if (selectedElement.isNew) {
      setElements((prev) => [...prev, { ...selectedElement, ...elementData }]);
    } else {
      setElements((prev) =>
        prev.map((element) =>
          selectedElement.id === element.id
            ? { ...selectedElement, ...elementData }
            : element,
        ),
      );
    }

    setSelectedElement({});
    closeModal();
  };

  return (
    <div className="w-screen h-screen absolute flex items-center justify-center bg-slate-500/30 backdrop-blur-sm">
      <div className="w-[424px] h-5/6 bg-white rounded">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 className="text-lg font-semibold text-gray-900 ">
            Edit {toTitleCase(selectedElement.type)}
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-500 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
            data-modal-toggle="crud-modal"
            onClick={closeModal}
          >
            <CrossIcon />
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto h-3/4">
          <div className="flex flex-col mb-6">
            <label htmlFor="text">
              Text{' '}
              <span
                className={`text-red-500 ml-2 ${
                  isInputElement ? 'text-xs' : 'hidden'
                }`}
              >
                *Not required for input element
              </span>
            </label>
            <input
              id="text"
              type="text"
              placeholder="Type here"
              className="px-2 py-3 border"
              autoFocus
              disabled={isInputElement}
              value={elementData.text}
              onChange={(e) =>
                setElementData((prev) => ({ ...prev, text: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="x">X</label>
            <input
              id="x"
              type="number"
              placeholder="Type here"
              className="px-2 py-3 border"
              value={elementData.x}
              onChange={(e) =>
                setElementData((prev) => ({ ...prev, x: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="y">Y</label>
            <input
              id="y"
              type="number"
              placeholder="Type here"
              className="px-2 py-3 border"
              value={elementData.y}
              onChange={(e) =>
                setElementData((prev) => ({ ...prev, y: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="fontSize">Font Size</label>
            <input
              id="fontSize"
              type="number"
              placeholder="Type here"
              className="px-2 py-3 border"
              value={elementData.fontSize}
              onChange={(e) =>
                setElementData((prev) => ({
                  ...prev,
                  fontSize: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="fontWeight">Font Weight</label>
            <input
              id="fontWeight"
              type="number"
              placeholder="Type here"
              className="px-2 py-3 border"
              value={elementData.fontWeight}
              onChange={(e) =>
                setElementData((prev) => ({
                  ...prev,
                  fontWeight: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <button
          className="py-2 px-4 bg-[#0044C1] text-white my-3 ml-6"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Modal;
