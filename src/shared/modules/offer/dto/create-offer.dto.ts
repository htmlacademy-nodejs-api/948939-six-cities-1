import { OfferType, Amenities, User, City } from '../../../types/index.js';

export class CreateOfferDto {
  public name!: string;
  public description!: string;
  public createdAt!: string;
  public city!: City;
  public previewImage!: string;
  public images!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public type!: OfferType;
  public roomsCount!: number;
  public guestsCount!: number;
  public price!: number;
  public amenities!: Amenities[];
  public userId!: User;
  public commentsCount!: number;
  public latitude!: number;
  public longitude!: number;
}
