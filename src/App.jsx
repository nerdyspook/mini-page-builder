import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DropArea from './components/DropArea';
import Modal from './components/Modal';
import useModal from './hooks/useModal';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [selectedElement, setSelectedElement] = useState({});
  const [elements, setElements] = useLocalStorage('elements', []);
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <main className="h-screen w-full flex flex-col justify-between md:flex-row relative">
      <DropArea
        setSelectedElement={setSelectedElement}
        selectedElement={selectedElement}
        setElements={setElements}
        elements={elements}
        openModal={openModal}
      />
      <Sidebar
        elements={elements}
        setElements={setElements}
        setSelectedElement={setSelectedElement}
        selectedElement={selectedElement}
        openModal={openModal}
      />
      {isModalOpen && (
        <Modal
          setSelectedElement={setSelectedElement}
          selectedElement={selectedElement}
          setElements={setElements}
          closeModal={closeModal}
        />
      )}
    </main>
  );
}

export default App;
