import type { AuditedEntityDto, EntityDto } from '@abp/ng.core';

export interface CreateUpdateOrderDto {
  customerId: number;
  productId: number;
  description: string;
  count: number;
  pirce: number;
  priceAll: number;
  orderDate: string;
}

export interface CustomerLookupDto extends EntityDto<number> {
  name?: string;
}

export interface OrderDto extends AuditedEntityDto<number> {
  customerId: number;
  customerName?: string;
  productId: number;
  productName?: string;
  description?: string;
  count: number;
  pirce: number;
  priceAll: number;
  orderDate?: string;
}

export interface ProductLookupDto extends EntityDto<number> {
  name?: string;
}
