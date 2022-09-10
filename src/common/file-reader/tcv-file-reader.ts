import { readFileSync } from 'fs';
import { FileReaderInterface } from './file-reader.interface';
import { UserType } from '../../types/user-type.enum.js';
import { CityType } from '../../types/city-type.enum.js';
import { AccomodationType } from '../../types/accommodation-type.enum.js';
import { Offer } from '../../types/offer.type';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): Offer[]  {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([...fields]) => {
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
          coords
        ] = fields;

        return {
          title,
          description,
          postDate: new Date(createDate),
          city: CityType[ city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
          previewImage: previewImage,
          photos: photos.split(';').map((url) => url),
          isPremium: JSON.parse(isPremium),
          rating: Number.parseInt(rating, 10),
          accomadationType: AccomodationType[accomadationType as 'apartment' | 'house' | 'room' | 'hotel'],
          rooms: Number.parseInt(rooms, 10),
          guests: Number.parseInt(guests, 10),
          price: Number.parseInt(price, 10),
          facilities: facilities.split(';').map((facility) => facility),
          user: { firstname, email, avatarPath, password, type: UserType[type as 'Pro' | 'Normal']  },
          comments: Number.parseInt(comments, 10),
          coords: coords.split(';').reduce((acc, current) => {
            const values = current.split(':');
            const [key, value] = values;
            return {
              ...acc,
              [key]: value,
            };
          }, {}),
        };
      });
  }
}
