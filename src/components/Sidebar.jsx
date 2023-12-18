import Block from './Block';

const blocks = [
  { type: 'label', name: 'Label' },
  { type: 'input', name: 'Input' },
  { type: 'button', name: 'Button' },
];

const Sidebar = () => {
  return (
    <section className="w-[326px] bg-[#2D2D2D] h-screen py-5 px-6">
      <h4 className="text-xl font-bold text-white pb-4">BLOCKS</h4>
      <ul>
        {blocks.map((eachBlock) => (
          <Block elementType={eachBlock.name} key={eachBlock.name} />
        ))}
      </ul>
    </section>
  );
};

export default Sidebar;
