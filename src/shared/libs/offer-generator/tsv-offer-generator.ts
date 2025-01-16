import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, MockCity, OfferType, UserType } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems, getRandomBoolean } from '../../helpers/index.js';
import generator from 'generate-password';

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.names);
    const description = getRandomItem<string>(this.mockData.descriptions);

    const createdAt = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    const cityObj = getRandomItem<MockCity>(this.mockData.cities);
    const city = cityObj.name;
    const cityLatitude = cityObj.latitude;
    const cityLongitude = cityObj.longitude;

    const previewImage = getRandomItem<string>(this.mockData.photos);
    const images = getRandomItems<string>(this.mockData.photos).join(',');
    const isPremium = getRandomBoolean();
    const rating = generateRandomValue(1, 5).toString();
    const type = getRandomItem<OfferType>([OfferType.Apartment, OfferType.Hotel, OfferType.House, OfferType.Room]);
    const roomsCount = generateRandomValue(1, 5).toString();
    const guestsCount = generateRandomValue(1, 4).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const amenities = getRandomItems<string>(this.mockData.amenities).join(',');
    const author = getRandomItem<string>(this.mockData.authors);
    const authorEmail = getRandomItem<string>(this.mockData.emails);
    const authorAvatar = getRandomItem<string>(this.mockData.avatars);

    const authorPassword = generator.generate({
      length: 10,
      numbers: true
    });

    const authorType = getRandomItem<string>([UserType.Ordinary, UserType.Pro]);
    const commentsCount = generateRandomValue(0, 100).toString();
    const latitude = generateRandomValue(0, 90).toString();
    const longitude = generateRandomValue(0, 90).toString();

    return [
      name,
      description,
      createdAt,
      city,
      cityLatitude,
      cityLongitude,
      previewImage,
      images,
      isPremium,
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
      longitude
    ].join('\t');
  }
}
