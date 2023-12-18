import { useState, useRef } from 'react';
import Sidebar from './components/Sidebar';
import useModal from './hooks/useModal';
import DropArea from './components/DropArea';

function App() {
  const [elements, setElements] = useState([]);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [selectedElement, setSelectedElement] = useState({});

  return (
    <main className="flex justify-between">
      <DropArea
        setSelectedElement={setSelectedElement}
        selectedElement={selectedElement}
        setElements={setElements}
        elements={elements}
      />
      <Sidebar />
    </main>
  );
}

export default App;
