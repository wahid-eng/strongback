import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class MongoObjectIdPipe implements PipeTransform {
  transform(value: any) {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`Invalid id provided: ${value}`);
    }
    return Types.ObjectId.createFromHexString(value);
  }
}
