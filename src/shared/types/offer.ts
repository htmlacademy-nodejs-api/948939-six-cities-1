import {User} from './user.js';

export type City = {
  name: string,
  latitude: number,
  longitude: number
}

export enum OfferType {
  Apartment = 'Apartment',
  House = 'House',
  Room = 'Room',
  Hotel = 'Hotel'
}

export enum Amenities {
  Breakfast = 'Breakfast',
  AirConditioning = 'AirConditioning',
  LaptopFriendlyWorkspace = 'LaptopFriendlyWorkspace',
  BabySeat = 'BabySeat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge',
}

export type Offer = {
  name: string;
  description: string;
  createdAt: string;
  city: City
  previewImage: string;
  images: string[];
  isPremium: boolean;
  rating: number;
  type: OfferType;
  roomsCount: number;
  guestsCount: number;
  price: number;
  amenities: Amenities[];
  author: User;
  commentsCount: number;
  latitude: number;
  longitude: number
}
