import IClothesImage from '../wardrobe/models/clothesImage.model';

export default interface NewStylisation {
  clothes: IClothesImage[];
  tag: string;
}
