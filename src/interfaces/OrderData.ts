export interface OrderData {
  extOrderId: string;
  type: string;
  fromLocation?: string;
  toLocation?: string;
  cargoType?: string;
  cargoAmount?: string;
}
