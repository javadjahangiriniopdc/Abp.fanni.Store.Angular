import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { CustomerService, CustomerDto } from '@proxy/customers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [ListService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class CustomerComponent implements OnInit {
  customer = { items: [], totalCount: 0 } as PagedResultDto<CustomerDto>;

  form: FormGroup; // add this line

  constructor(public readonly list: ListService,
    private customerService: CustomerService,
    private fb: FormBuilder // inject FormBuilder
  ) { }
  isModalOpen = false; // add this line

  ngOnInit(): void {
    const customerStreamCreator = (query) => this.customerService.getList(query);

    this.list.hookToQuery(customerStreamCreator).subscribe((response) => {
      this.customer = response;
    });


  }

  // add new method
  createBook() {
    this.buildForm(); // add this line
    this.isModalOpen = true;
  }
  // add buildForm method
  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      family: [null, Validators.required],
      brithday: [null, Validators.required],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    this.customerService.create(this.form.value).subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

}
