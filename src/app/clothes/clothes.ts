export default interface IClothes {
  id: number;
  user_id: string // or number?;
  clothType: string;
  color: string;
  code: string;
  brand: string;
  style: string;
  size: string;
  tag: string[];
  shopLink: string;
  stylizations: string[]; //list of stylisations id
}
