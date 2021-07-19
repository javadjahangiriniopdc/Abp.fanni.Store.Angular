import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { CustomerService, CustomerDto } from '@proxy/customers';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [ListService],
})
export class CustomerComponent implements OnInit {
  customer = { items: [], totalCount: 0 } as PagedResultDto<CustomerDto>;

  constructor(public readonly list: ListService, private customerService: CustomerService) { }

  ngOnInit(): void {
    const customerStreamCreator = (query) => this.customerService.getList(query);

    this.list.hookToQuery(customerStreamCreator).subscribe((response) => {
      this.customer = response;
    });
  }

}
