interface OrderObj {
  extOrderId: string;
  type: string[];
  fromLocation?: string;
  toLocation?: string;
  cargoType?: string;
  cargoAmount?: string;
}

export interface ModifiedOrderObject {
  [index: string]: OrderObj;
}
