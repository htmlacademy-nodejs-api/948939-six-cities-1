import {
  IsMongoId,
  IsString,
  IsInt,
  Min,
  Max,
  MinLength,
  MaxLength
} from 'class-validator';
import { CreateCommentMessages } from './create-comment.messages.js';

export class CreateCommentDto {
  @IsString()
  @MinLength(5, { message: CreateCommentMessages.text.minLength })
  @MaxLength(1024, { message: CreateCommentMessages.text.maxLength })
  public text!: string;

  @IsInt({ message: CreateCommentMessages.rating.invalidFormat })
  @Min(1, { message: CreateCommentMessages.rating.minValue })
  @Max(5, { message: CreateCommentMessages.rating.maxValue })
  public rating!: number;

  @IsMongoId({ message: CreateCommentMessages.userId.invalidFormat })
  public userId!: string;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public offerId!: string;
}
