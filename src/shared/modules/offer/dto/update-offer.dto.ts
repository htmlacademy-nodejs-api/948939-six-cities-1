import { OfferType, Amenities, User, City } from '../../../types/index.js';
import {
  IsOptional,
  IsMongoId,
  IsLatitude,
  IsLongitude,
  IsString,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  Min,
  Max,
  MinLength,
  MaxLength,
  ArrayMinSize,
  ArrayMaxSize
} from 'class-validator';
import { CreateUpdateOfferMessage } from './update-offer.messages.js';

export class UpdateOfferDto {

  @IsOptional()
  @IsString()
  @MinLength(10, { message: CreateUpdateOfferMessage.title.minLength })
  @MaxLength(100, { message: CreateUpdateOfferMessage.title.maxLength })
  public name!: string;

  @IsOptional()
  @IsString()
  @MinLength(20, { message: CreateUpdateOfferMessage.description.minLength })
  @MaxLength(1024, { message: CreateUpdateOfferMessage.description.maxLength })
  public description!: string;

  @IsOptional()
  public city!: City;

  @IsOptional()
  @IsString()
  public previewImage!: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsString()
  public images!: string[];

  @IsOptional()
  @IsBoolean()
  public isPremium!: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: CreateUpdateOfferMessage.rating.minValue })
  @Max(5, { message: CreateUpdateOfferMessage.rating.maxValue })
  public rating!: number;

  @IsOptional()
  @IsEnum(OfferType, { message: CreateUpdateOfferMessage.type.invalid })
  public type!: OfferType;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.roomsCount.invalidFormat })
  @Min(1, { message: CreateUpdateOfferMessage.roomsCount.minValue })
  @Max(8, { message: CreateUpdateOfferMessage.roomsCount.maxValue })
  public roomsCount!: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.guestsCount.invalidFormat })
  @Min(1, { message: CreateUpdateOfferMessage.guestsCount.minValue })
  @Max(10, { message: CreateUpdateOfferMessage.guestsCount.maxValue })
  public guestsCount!: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.price.invalidFormat })
  @Min(100, { message: CreateUpdateOfferMessage.price.minValue })
  @Max(100000, { message: CreateUpdateOfferMessage.price.maxValue })
  public price!: number;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferMessage.amenities.notArray })
  @IsEnum(Amenities, { message: CreateUpdateOfferMessage.amenities.invalid })
  public amenities!: Amenities[];

  @IsOptional()
  @IsMongoId()
  public userId!: User;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.commentsCount.invalidFormat })
  public commentsCount!: number;

  @IsOptional()
  @IsLatitude()
  public latitude!: number;

  @IsOptional()
  @IsLongitude()
  public longitude!: number;
}
