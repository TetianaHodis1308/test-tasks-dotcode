export interface Input {
  sequence: number;
  prev_out: {
    spent: boolean;
    tx_index: number;
    type: number;
    addr: string;
    value: number;
    n: number;
    script: string;
  };
  script: string;
}

export interface Transaction {
  lock_time: number;
  ver: number;
  size: number;
  inputs: Input[];
  time: number;
  tx_index: number;
  vin_sz: number;
  hash: string;
  vout_sz: number;
  relayed_by: string;
  out: Output[];
}

export interface Output {
  spent: boolean;
  tx_index: number;
  type: number;
  addr: string;
  value: number;
  n: number;
  script: string;
}
