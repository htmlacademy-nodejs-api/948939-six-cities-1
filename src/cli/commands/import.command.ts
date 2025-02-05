import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { DatabaseClient } from '../../shared/libs/database-client/index.js';
import { OfferService } from '../../shared/modules/offer/index.js';
import { UserService } from '../../shared/modules/user/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { createOffer, getMongoURI } from '../../shared/helpers/index.js';
import { Offer } from './../../shared/types/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';
import { Component } from '../../shared/types/index.js';
import { Config, RestSchema } from '../../shared/libs/config/index.js';
import { inject, injectable } from 'inversify';

@injectable()
export class ImportCommand implements Command {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
  ) {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    this.logger.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    console.log(offer.author.password)
    const user = await this.userService.findOrCreate({...offer.author}, this.config.get('SALT'),);

    await this.offerService.create({
      userId: user.id,
      name: offer.name,
      description: offer.description,
      city: offer.city,
      previewImage: offer.previewImage,
      images: offer.images,
      isPremium: offer.isPremium,
      rating: offer.rating,
      type: offer.type,
      roomsCount: offer.roomsCount,
      guestsCount: offer.guestsCount,
      price: offer.price,
      amenities: offer.amenities,
      commentsCount: offer.commentsCount,
      latitude: offer.latitude,
      longitude: offer.longitude
    });

  }

  public getName(): string {
    return '--import';
  }

  public async execute(filename: string): Promise<void> {

    const uri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      this.logger.error(`Can't import data from file: ${filename}`, error as Error);
      this.logger.error(getErrorMessage(error), error as Error);
    }
  }
}
