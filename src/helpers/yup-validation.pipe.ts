import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as yup from 'yup';

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private readonly schema: yup.Schema<any>) {}

  transform(value: any, metadata: ArgumentMetadata): any {
    try {
      return this.schema.validateSync(value, { stripUnknown: true });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
