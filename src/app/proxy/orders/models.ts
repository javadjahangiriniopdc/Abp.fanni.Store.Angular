import type { AuditedEntityDto, EntityDto } from '@abp/ng.core';

export interface CreateUpdateOrderDto {
  customerId?: string;
  productId?: string;
  description: string;
  count: number;
  pirce: number;
  priceAll: number;
  orderDate: string;
}

export interface CustomerLookupDto extends EntityDto<string> {
  name?: string;
}

export interface OrderDto extends AuditedEntityDto<string> {
  customerId?: string;
  customerName?: string;
  productId?: string;
  productName?: string;
  description?: string;
  count: number;
  pirce: number;
  priceAll: number;
  orderDate?: string;
}

export interface ProductLookupDto extends EntityDto<string> {
  name?: string;
}
