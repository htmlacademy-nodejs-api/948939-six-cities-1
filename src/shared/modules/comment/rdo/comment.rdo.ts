import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { OfferRdo } from '../../offer/rdo/offer.rdo.js';

export class CommentRdo {
  @Expose()
  public text!: string;

  @Expose()
  public rating!: number;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user!: string;

  @Expose({ name: 'offerId'})
  @Type(() => OfferRdo)
  public offer!: string;
}
