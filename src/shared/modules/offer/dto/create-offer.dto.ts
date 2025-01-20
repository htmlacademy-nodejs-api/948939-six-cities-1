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
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {

  @IsString()
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public name!: string;

  @IsString()
  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description!: string;

  public city!: City;

  @IsString()
  public previewImage!: string;

  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsString()
  public images!: string[];

  @IsBoolean()
  public isPremium!: boolean;

  @IsNumber()
  @Min(1, { message: CreateOfferValidationMessage.rating.minValue })
  @Max(5, { message: CreateOfferValidationMessage.rating.maxValue })
  public rating!: number;

  @IsEnum(OfferType, { message: CreateOfferValidationMessage.type.invalid })
  public type!: OfferType;

  @IsInt({ message: CreateOfferValidationMessage.roomsCount.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.roomsCount.minValue })
  @Max(8, { message: CreateOfferValidationMessage.roomsCount.maxValue })
  public roomsCount!: number;

  @IsInt({ message: CreateOfferValidationMessage.guestsCount.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.guestsCount.minValue })
  @Max(10, { message: CreateOfferValidationMessage.guestsCount.maxValue })
  public guestsCount!: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price!: number;

  @IsArray({ message: CreateOfferValidationMessage.amenities.notArray })
  @IsEnum(Amenities, { message: CreateOfferValidationMessage.amenities.invalid })
  public amenities!: Amenities[];

  @IsMongoId()
  public userId!: User;

  @IsInt({ message: CreateOfferValidationMessage.commentsCount.invalidFormat })
  public commentsCount!: number;

  @IsLatitude()
  public latitude!: number;

  @IsLongitude()
  public longitude!: number;
}
