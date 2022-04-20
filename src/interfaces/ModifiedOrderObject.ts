interface OrderObj {
  type: string[];
  fromLocation?: string;
  toLocation?: string;
  cargoType?: string;
  cargoAmount?: string;
}

export interface ModifiedOrderObject {
  [index: string]: OrderObj;
}
