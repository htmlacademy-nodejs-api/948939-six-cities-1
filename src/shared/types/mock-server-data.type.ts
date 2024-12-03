export type MockCity = {
  name: string;
  latitude:  number;
  longitude: number;
}

export type MockServerData = {
  names: string[];
  descriptions: string[];
  cities: MockCity[];
  types: string[];
  amenities: string[];
  authors: string[];
  emails: string[];
  avatars: string[];
  photos: string[];
};
