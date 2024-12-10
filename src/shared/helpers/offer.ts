import { Amenities, City, Offer, OfferType, User, UserType } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    name,
    description,
    createdAt,
    cityName,
    cityLatitude,
    cityLongitude,
    previewImage,
    imagesRaw,
    isPremium,
    isFavorite,
    rating,
    type,
    roomsCount,
    guestsCount,
    price,
    amenities,
    authorName,
    authorEmail,
    authorAvatar,
    authorPassword,
    authorType,
    commentsCount,
    latitude,
    longitude,
  ] = offerData.replace('\n', '').split('\t');

  const author: User = {
    email: authorEmail,
    name: authorName,
    avatar: authorAvatar,
    password: authorPassword,
    type: authorType as UserType
  };

  const city: City = {
    name: cityName,
    latitude: Number(cityLatitude),
    longitude: Number(cityLongitude)
  };

  return {
    name: name,
    description,
    createdAt: createdAt,
    city,
    previewImage,
    images: imagesRaw.split(','),
    author,
    isPremium: Boolean(isPremium),
    isFavorite: Boolean(isFavorite),
    rating: Number(rating),
    type: type as OfferType,
    price: Number.parseInt(price, 10),
    roomsCount: Number.parseInt(roomsCount, 10),
    guestsCount: Number.parseInt(guestsCount, 10),
    latitude: Number(latitude),
    longitude: Number(longitude),
    commentsCount: Number(commentsCount),
    amenities: amenities.split(',') as Amenities[]
  };
}
