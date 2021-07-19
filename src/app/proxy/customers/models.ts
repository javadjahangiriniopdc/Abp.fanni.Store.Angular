import type { AuditedEntityDto } from '@abp/ng.core';

export interface CreateUpdateCustomerDto {
  name: string;
  family: string;
  birthday: string;
}

export interface CustomerDto extends AuditedEntityDto<number> {
  name?: string;
  family?: string;
  birthday?: string;
}
