import { mapEnumToOptions } from '@abp/ng.core';

export enum ProductType {
  Undefined = 1,
  It = 2,
  Mobile = 3,
  Computer = 4,
}

export const productTypeOptions = mapEnumToOptions(ProductType);
