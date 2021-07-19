import type { ProductType } from './product-type.enum';
import type { AuditedEntityDto } from '@abp/ng.core';

export interface CreateUpdateProductDto {
  name: string;
  pirce: number;
  productType: ProductType;
}

export interface ProductDto extends AuditedEntityDto<number> {
  name?: string;
  pirce: number;
  productType: ProductType;
}
