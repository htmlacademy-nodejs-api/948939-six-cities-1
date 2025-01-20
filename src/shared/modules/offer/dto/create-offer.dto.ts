import { OfferType, Amenities, User, City } from '../../../types/index.js';
import {
  IsEnum,
  IsString,
  IsInt,
  IsArray,
  IsMongoId,
  IsNumber,
  IsLatitude,
  IsLongitude,
  IsBoolean,
  Min,
  Max,
  MinLength,
  MaxLength,
  ArrayMinSize,
  ArrayMaxSize
} from 'class-validator';
import { OfferMessage } from './offer.messages.js';

export class CreateOfferDto {

  @IsString()
  @MinLength(10, { message: OfferMessage.title.minLength })
  @MaxLength(100, { message: OfferMessage.title.maxLength })
  public name!: string;

  @IsString()
  @MinLength(20, { message: OfferMessage.description.minLength })
  @MaxLength(1024, { message: OfferMessage.description.maxLength })
  public description!: string;

  public city!: City;

  @IsString()
  public previewImage!: string;

  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsString({each: true})
  public images!: string[];

  @IsBoolean()
  public isPremium!: boolean;

  @IsNumber()
  @Min(1, { message: OfferMessage.rating.minValue })
  @Max(5, { message: OfferMessage.rating.maxValue })
  public rating!: number;

  @IsEnum(OfferType, { message: OfferMessage.type.invalid })
  public type!: OfferType;

  @IsInt({ message: OfferMessage.roomsCount.invalidFormat })
  @Min(1, { message: OfferMessage.roomsCount.minValue })
  @Max(8, { message: OfferMessage.roomsCount.maxValue })
  public roomsCount!: number;

  @IsInt({ message: OfferMessage.guestsCount.invalidFormat })
  @Min(1, { message: OfferMessage.guestsCount.minValue })
  @Max(10, { message: OfferMessage.guestsCount.maxValue })
  public guestsCount!: number;

  @IsInt({ message: OfferMessage.price.invalidFormat })
  @Min(100, { message: OfferMessage.price.minValue })
  @Max(100000, { message: OfferMessage.price.maxValue })
  public price!: number;

  @IsArray({ message: OfferMessage.amenities.notArray })
  @IsEnum(Amenities, {each: true, message: OfferMessage.amenities.invalid })
  public amenities!: Amenities[];

  @IsMongoId()
  public userId!: User;

  @IsInt({ message: OfferMessage.commentsCount.invalidFormat })
  public commentsCount!: number;

  @IsLatitude()
  public latitude!: number;

  @IsLongitude()
  public longitude!: number;
}
