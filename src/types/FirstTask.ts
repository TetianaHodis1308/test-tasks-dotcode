export interface InitialBlocksPositionsType {
  id: number;
  x: number;
  y: number;
  width: number | string;
  height: number | string;
  z: number;
}

export interface TileProps {
  blockNumber: number;
  removeBlock: (id: number) => void;
  activeBlock: number;
}
