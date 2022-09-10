import _ from 'lodash';
import dayjs from 'dayjs';

import { OfferGeneratorInterface } from './offer-generator.interface';
import { MockData } from '../../types/mock-data.type';
import { Coordinates } from '../../types/coordinate.type';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;
const ARRAY_MOCK = [
  'title',
  'description',
  'createdDate',
  'city',
  'previewImage',
  'photos',
  'isPremium',
  'rating',
  'accomadationType',
  'rooms',
  'guests',
  'price',
  'facilities',
  'users',
  'emails',
  'avatar',
  'password',
  'type',
  'comments',
];

export class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData ) {}

  public generate(): string {
    const mockData = this.mockData;

    const arrVar = ARRAY_MOCK.map((key) => {
      if (key === 'facilities') {
        const startPos = _.random(mockData[key].length - 1);
        const endPos = startPos + _.random(startPos, mockData[key].length);

        return mockData[key].slice(startPos, endPos).join(';');
      } else if (key === 'createdDate') {
        return  dayjs().subtract(_.random(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
      }

      const keyValue = key as keyof typeof mockData;

      return mockData[keyValue][_.random(mockData[keyValue].length - 1)];
    });

    const randomCoords: Coordinates = mockData.coords[_.random(mockData.coords.length - 1)];
    const randomStr: string= Object.keys(randomCoords).reduce((acc, current, idx, arr) => {
      const objK = current as keyof typeof randomCoords;
      return `${acc}${current}:${randomCoords[objK]}${idx === arr.length - 1? '': ';'}`;
    }, '');
    arrVar.push(randomStr);

    return [...arrVar].join('\t');
  }
}
