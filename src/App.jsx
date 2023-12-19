import { useState } from 'react';
import useModal from './hooks/useModal';
import Sidebar from './components/Sidebar';
import DropArea from './components/DropArea';
import Modal from './components/Modal';

function App() {
  const [elements, setElements] = useState([]);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [selectedElement, setSelectedElement] = useState({});

  return (
    <main className="flex justify-between relative">
      <DropArea
        setSelectedElement={setSelectedElement}
        selectedElement={selectedElement}
        elements={elements}
        openModal={openModal}
      />
      <Sidebar />
      {isModalOpen && (
        <Modal
          selectedElement={selectedElement}
          setElements={setElements}
          closeModal={closeModal}
        />
      )}
    </main>
  );
}

export default App;
