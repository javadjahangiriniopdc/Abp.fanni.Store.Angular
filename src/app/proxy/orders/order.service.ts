import type { CreateUpdateOrderDto, CustomerLookupDto, OrderDto, ProductLookupDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiName = 'Default';

  create = (input: CreateUpdateOrderDto) =>
    this.restService.request<any, OrderDto>({
      method: 'POST',
      url: '/api/app/order',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/order/${id}`,
    },
    { apiName: this.apiName });

  get = (id: number) =>
    this.restService.request<any, OrderDto>({
      method: 'GET',
      url: `/api/app/order/${id}`,
    },
    { apiName: this.apiName });

  getCustomerLookup = () =>
    this.restService.request<any, ListResultDto<CustomerLookupDto>>({
      method: 'GET',
      url: '/api/app/order/customer-lookup',
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<OrderDto>>({
      method: 'GET',
      url: '/api/app/order',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  getProductLookup = () =>
    this.restService.request<any, ListResultDto<ProductLookupDto>>({
      method: 'GET',
      url: '/api/app/order/product-lookup',
    },
    { apiName: this.apiName });

  update = (id: number, input: CreateUpdateOrderDto) =>
    this.restService.request<any, OrderDto>({
      method: 'PUT',
      url: `/api/app/order/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
