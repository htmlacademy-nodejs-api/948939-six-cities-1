import { OfferType, Amenities, User, City } from '../../../types/index.js';
import { Expose } from 'class-transformer';

export class OfferRdo {
  @Expose()
  public name!: string;

  @Expose()
  public description!: string;

  @Expose()
  public city!: City;

  @Expose()
  public previewImage!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: OfferType;

  @Expose()
  public roomsCount!: number;

  @Expose()
  public guestsCount!: number;

  @Expose()
  public price!: number;

  @Expose()
  public amenities!: Amenities[];

  @Expose()
  public userId!: User;

  @Expose()
  public commentsCount!: number;

  @Expose()
  public latitude!: number;

  @Expose()
  public longitude!: number;
}
