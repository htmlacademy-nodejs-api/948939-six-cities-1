import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Amenities, Offer, OfferType, UserType } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string,
  ) {
  }

  public read(): void {
    try {
      this.rawData = readFileSync(this.filename, 'utf-8');
    } catch (error: unknown) {
      console.error(`Can't read file from path ${this.filename}.`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
        name,
        description,
        createdAt,
        city,
        cityLatitude,
        cityLongitude,
        previewImage,
        images,
        isPremium,
        isFavorite,
        rating,
        type,
        roomsCount,
        guestsCount,
        price,
        amenities,
        author,
        authorEmail,
        authorAvatar,
        authorPassword,
        authorType,
        commentsCount,
        latitude,
        longitude,
      ]) =>
        ({
          name,
          description,
          createdAt,
          city: {
            name: city,
            latitude: Number(cityLatitude),
            longitude: Number(cityLongitude)
          },
          previewImage,
          images: images.split(','),
          isPremium: Boolean(isPremium),
          isFavorite: Boolean(isFavorite),
          rating: Number(rating),
          type: type as OfferType,
          roomsCount: Number(roomsCount),
          guestsCount: Number(guestsCount),
          price: Number(price),
          amenities: amenities.split(',') as Amenities[],
          author: {
            name: author,
            email: authorEmail,
            avatar: authorAvatar,
            password: authorPassword,
            type: authorType as UserType,
          },
          commentsCount: Number(commentsCount),
          latitude: Number(latitude),
          longitude: Number(longitude)
        })
      );
  }
}
