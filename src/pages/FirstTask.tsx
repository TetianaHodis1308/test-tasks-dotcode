import { Rnd } from 'react-rnd';
import { useState } from 'react';
import { Tile } from '../components/Tile';
import type { InitialBlocksPositionsType } from '../types/FirstTask';

const blockNumbers: number[] = [1, 2, 3, 4, 5];
const widthBlock = 300;
const heightBlock = 100;

const initialBlocksPositions: InitialBlocksPositionsType[] = blockNumbers.map(
  (val, index) => {
    return {
      id: val,
      x: 0,
      y: index * (heightBlock + 10),
      width: widthBlock,
      height: heightBlock,
      z: 1,
    };
  },
);

const FirstTask = () => {
  const blocksPositionsFromStorageString =
    localStorage.getItem('blocksPositions');
  const blocksPositionsFromStorage: InitialBlocksPositionsType[] =
    blocksPositionsFromStorageString ?
      JSON.parse(blocksPositionsFromStorageString)
    : [];
  const [blocks, setBlocks] = useState(
    blocksPositionsFromStorage.length ?
      blocksPositionsFromStorage
    : initialBlocksPositions,
  );
  const [activeBlock, setActiveBlock] = useState(0);

  const updateBlock = (
    id: number,
    updates: Partial<InitialBlocksPositionsType>,
  ) => {
    setBlocks((prev) => {
      const newBlocks = prev.map((block) =>
        block.id === id ? { ...block, ...updates } : block,
      );
      localStorage.setItem('blocksPositions', JSON.stringify(newBlocks));
      return newBlocks;
    });
    setActiveBlock(id);
  };

  const moveBlockToFront = (id: number) => {
    const maxZindex = Math.max(...blocks.map((b) => b.z));
    updateBlock(id, { z: maxZindex + 1 });
  };

  const removeBlock = (id: number) => {
    setBlocks((prev) => prev.filter((blockNumber) => blockNumber.id !== id));
  };

  const reset = () => setBlocks(initialBlocksPositions);

  return (
    <section className="flex flex-col items-center justify-start min-h-[60vh] bg-white px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
        First Task
      </h1>

      <h2 className="text-3l sm:text-4xl text-orange-500 mb-6">
        Interactive Workspace
      </h2>
      <div className="relative w-full h-[800px] bg-gray-100 p-4">
        {blocks.map((block) => (
          <Rnd
            key={block.id}
            size={{ width: block.width, height: block.height }}
            position={{ x: block.x, y: block.y }}
            onDragStop={(_e, d) => {
              updateBlock(block.id, { x: d.x, y: d.y });
            }}
            onResizeStop={(_e, _dir, ref, _delta, pos) => {
              updateBlock(block.id, {
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height),
                x: pos.x,
                y: pos.y,
              });
            }}
            dragGrid={[10, 10]}
            bounds="parent"
            style={{ zIndex: block.z }}
            onClick={() => moveBlockToFront(block.id)}
          >
            <div className="w-full h-full relative">
              <Tile
                blockNumber={block.id}
                removeBlock={removeBlock}
                activeBlock={activeBlock}
              />
            </div>
          </Rnd>
        ))}

        <button
          onClick={reset}
          className="absolute bottom-4 left-4 px-4 py-2 bg-orange-500 text-white rounded shadow"
        >
          Reset
        </button>
      </div>
    </section>
  );
};

export default FirstTask;
