import { inject, injectable } from 'inversify';
import { CommentService } from './comment-service.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { OfferEntity } from '../offer/offer.entity.js';


@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);
    const avgRatingResult = await this.commentModel
      .aggregate([
        {
          $match: {
            offerId: dto.offerId
          }
        },
        {
          $group: {
            _id: '$offerId',
            avgRating: { $avg: '$rating' }
          }
        },
      ])
      .exec();
    const avgRating = avgRatingResult[0].avgRating;

    const setNewRating = { $set: { rating : avgRating } };
    const incrementCommentCount = { $inc: { commentCount : 1 } };
    await this.offerModel.findByIdAndUpdate({ offerId: dto.offerId }, {...setNewRating, ...incrementCommentCount});

    this.logger.info(`New comment created: ${dto.text.slice(0, 10)}`);
    return result;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ offerId })
      .populate(['offerId', 'userId'])
      .exec();
  }
}
