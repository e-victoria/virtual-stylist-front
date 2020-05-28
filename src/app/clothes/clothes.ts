export default interface IClothes {
  id: number;
  clothType: string;
  color: string;
  code: string;
  brand: string;
  style: string;
  size: string;
  tag: string[];
  shopLink: string;
  imageName: string;
  stylizations: string[]; //list of stylisations id
}
