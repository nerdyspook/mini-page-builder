import Block from './Block';

const blocks = [
  { type: 'label', name: 'Label' },
  { type: 'input', name: 'Input' },
  { type: 'button', name: 'Button' },
];

const Sidebar = ({ elements, setElements }) => {
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
    <section className="w-[326px] bg-[#2D2D2D] h-screen py-5 px-6">
      <h4 className="text-xl font-bold text-white pb-4">BLOCKS</h4>
      <ul>
        {blocks.map((eachBlock) => (
          <Block elementType={eachBlock.name} key={eachBlock.name} />
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
