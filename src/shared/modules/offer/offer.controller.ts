import {
  BaseController,
  HttpMethod
} from '../../libs/rest/index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CommentService } from '../comment/index.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { ParamsDictionary } from 'express-serve-static-core';

export type ParamOfferId = {
  offerId: string;
} | ParamsDictionary;

export type ParamCityName = {
  cityName: string;
} | ParamsDictionary;

@injectable()
export default class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');
    this.addRoute({
      path: '/offers',
      method: HttpMethod.Post,
      handler: this.createOffer,
    });
    this.addRoute({
      path: '/offers',
      method: HttpMethod.Get,
      handler: this.getOffers,
    });
    this.addRoute({
      path: '/offers/:offerId',
      method: HttpMethod.Get,
      handler: this.getOneOffer,
    });
    this.addRoute({
      path: '/offers/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteOneOffer,
    });
    this.addRoute({
      path: '/offers/:offerId',
      method: HttpMethod.Patch,
      handler: this.updateOneOffer,
    });
    this.addRoute({
      path: '/offers/premium/:city',
      method: HttpMethod.Get,
      handler: this.getPremiumOffersByCity,
    });
    this.addRoute({
      path: '/offers/favorite',
      method: HttpMethod.Get,
      handler: this.getFavorite,
    });
    this.addRoute({
      path: '/offers/favorite/:offerId',
      method: HttpMethod.Post,
      handler: this.addFavorite,
    });
    this.addRoute({
      path: '/offers/favorite/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteFavorite,
    });
  }

  public async createOffer({ body }: Request<unknown, unknown, CreateOfferDto>, res: Response<OfferRdo>): Promise<void> {
    const newOffer = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, newOffer));
  }

  public async getOffers(_req: Request, res: Response<OfferRdo[]>): Promise<void> {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async getOneOffer({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async deleteOneOffer({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);

    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  public async updateOneOffer({ params, body }: Request<ParamOfferId, CreateOfferDto>, res: Response): Promise<void> {
    const { offerId } = params;
    const updatedOffer = await this.offerService.updateById(offerId, body);
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async getPremiumOffersByCity({ params }: Request<ParamCityName>, res: Response): Promise<void> {
    const { cityName } = params;
    const offer = await this.offerService.findPremiumByCity(cityName);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async getFavorite(_req: Request, res: Response): Promise<void> {
    await this.offerService.findFavorite();
    this.ok(res, {});
  }

  public async addFavorite(_req: Request, res: Response): Promise<void> {
    await this.offerService.addToFavorite();
    this.ok(res, {});
  }

  public async deleteFavorite(_req: Request, res: Response): Promise<void> {
    await this.offerService.deleteFromFavorite();
    this.ok(res, {});
  }
}
