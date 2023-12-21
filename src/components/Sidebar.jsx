import Block from './Block';

const blocks = [
  { type: 'label', name: 'Label' },
  { type: 'input', name: 'Input' },
  { type: 'button', name: 'Button' },
];

const Sidebar = ({
  elements,
  setElements,
  setSelectedElement,
  selectedElement,
  openModal,
}) => {
  const exportPageConfig = () => {
    const jsonConfig = JSON.stringify(elements, null, 2);
    const blob = new Blob([jsonConfig], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'page-config.json';
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const importedJson = JSON.parse(e.target.result);
          setElements((prev) => [...prev, ...importedJson]);
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };

      reader.readAsText(file);
    }
  };

  return (
    <section className=" h-2/8 w-full bg-[#2D2D2D] md:w-[326px] md:h-screen py-2 md:py-5 px-2 md:px-6 overflow-auto">
      <h4 className="text-md md:text-xl font-bold text-white pb-4">BLOCKS</h4>
      <ul className="flex gap-2 md:block">
        {blocks.map((eachBlock) => (
          <Block
            elementType={eachBlock.name}
            key={eachBlock.name}
            setSelectedElement={setSelectedElement}
            selectedElement={selectedElement}
            openModal={openModal}
          />
        ))}
      </ul>
      <div>
        <button
          className="px-4 py-2 text-white bg-emerald-800 hover:bg-emerald-700 rounded mt-4"
          onClick={exportPageConfig}
        >
          Export
        </button>

        <label
          htmlFor="file-input"
          className="px-4 py-2 text-white bg-emerald-800 hover:bg-emerald-700 rounded ml-4"
        >
          Import
        </label>
        <input
          id="file-input"
          type="file"
          accept=".json"
          onChange={handleFileChange}
          hidden
        />
      </div>
    </section>
  );
};

export default Sidebar;
