import type { TileProps } from '../types/FirstTask';

export const Tile = ({ blockNumber, removeBlock, activeBlock }: TileProps) => {
  const isActiveBlock = activeBlock === blockNumber;

  return (
    <div
      className={`group w-full h-full bg-white border-2 ${isActiveBlock ? 'border-blue-200' : 'border-black'} flex flex-col cursor-move hover:border-blue-200`}
    >
      <div
        className={`flex items-center h-[20px] px-2 ${isActiveBlock && 'bg-blue-200'} group-hover:bg-blue-200`}
      >
        <button
          className="cursor-pointer w-[10px] h-[10px] border border-gray-500 bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center text-[8px] mr-2"
          aria-label={`Delete tile ${blockNumber}`}
          onClick={(e) => {
            e.stopPropagation();
            removeBlock(blockNumber);
          }}
        >
          -
        </button>
        <p className="flex-1 text-center text-sm font-bold leading-none">
          Tile {blockNumber}
        </p>
      </div>

      <div
        className={`w-full border-t border-2 ${isActiveBlock ? 'border-blue-200' : 'group-hover:border-blue-200 border-black'}`}
      />

      <div className="flex-1" />
    </div>
  );
};
