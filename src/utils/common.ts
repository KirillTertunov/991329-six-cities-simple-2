import crypto from 'crypto';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces/class-constructor.type.js';

import { UserType } from '../types/user-type.enum.js';
import { CityType } from '../types/city-type.enum.js';
import { AccomodationType } from '../types/accommodation-type.enum.js';
import { Offer } from '../types/offer.type';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const createErrorObject = (message: string) => ({
  error: message,
});

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    title,
    description,
    createDate,
    city,
    previewImage,
    photos,
    isPremium,
    rating,
    accomadationType,
    rooms,
    guests,
    price,
    facilities,
    firstname,
    email,
    avatarPath,
    password,
    type,
    comments,
    coords,
  ] = tokens;

  return {
    title,
    description,
    postDate: new Date(createDate),
    city: CityType[
      city as
        | 'Paris'
        | 'Cologne'
        | 'Brussels'
        | 'Amsterdam'
        | 'Hamburg'
        | 'Dusseldorf'
    ],
    previewImage: previewImage,
    photos: photos.split(';').map((url) => url),
    isPremium: JSON.parse(isPremium),
    rating: Number.parseInt(rating, 10),
    accomadationType:
      AccomodationType[
        accomadationType as 'apartment' | 'house' | 'room' | 'hotel'
      ],
    rooms: Number.parseInt(rooms, 10),
    guests: Number.parseInt(guests, 10),
    price: Number.parseInt(price, 10),
    facilities: facilities.split(';').map((facility) => facility),
    user: {
      firstname,
      email,
      avatarPath,
      password,
      type: UserType[type as 'Pro' | 'Normal'],
    },
    comments: Number.parseInt(comments, 10),
    coords: coords.split(';').reduce((acc, current) => {
      const values = current.split(':');
      const [key, value] = values;
      return {
        ...acc,
        [key]: value,
      };
    }, {}),
  } as Offer;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
