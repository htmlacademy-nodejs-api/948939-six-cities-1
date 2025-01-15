import { Container } from 'inversify';
import { CommentService } from './comment-service.interface.js';
import { Component } from '../../types/index.js';
import { DefaultCommentService } from './default-comment.service.js';
import { CommentEntity, CommentModel } from './comment.entity.js';
import { types } from '@typegoose/typegoose';

export function createCommentContainer() {
  const offerContainer = new Container();

  offerContainer.bind<CommentService>(Component.OfferService).to(DefaultCommentService);
  offerContainer.bind<types.ModelType<CommentEntity>>(Component.OfferModel).toConstantValue(CommentModel);

  return offerContainer;
}
