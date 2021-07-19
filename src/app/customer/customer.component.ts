import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { CustomerService, CustomerDto } from '@proxy/customers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [ListService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class CustomerComponent implements OnInit {
  customer = { items: [], totalCount: 0 } as PagedResultDto<CustomerDto>;

  selectedCustomer = {} as CustomerDto; 

  form: FormGroup; // add this line

  constructor(public readonly list: ListService,
    private customerService: CustomerService,
    private fb: FormBuilder, // inject FormBuilder
    private confirmation: ConfirmationService // inject the ConfirmationService
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
    this.selectedCustomer = {} as CustomerDto; // reset the selected book
    this.buildForm(); // add this line
    this.isModalOpen = true;
  }

  // Add editBook method
  editBook(id: number) {
    this.customerService.get(id).subscribe((customer) => {
      this.selectedCustomer = customer;
      this.buildForm();
      this.isModalOpen = true;
    });
  }
  // add buildForm method
  buildForm() {
    this.form = this.fb.group({
      name: [this.selectedCustomer.name ||'', Validators.required],
      family: [this.selectedCustomer.family ||null, Validators.required],
      brithday: [ this.selectedCustomer.birthday ? new Date(this.selectedCustomer.birthday) : null, Validators.required],
    });
  }

 // change the save method
 save() {
  if (this.form.invalid) {
    return;
  }

  const request = this.selectedCustomer.id
    ? this.customerService.update(this.selectedCustomer.id, this.form.value)
    : this.customerService.create(this.form.value);

  request.subscribe(() => {
    this.isModalOpen = false;
    this.form.reset();
    this.list.get();
  });
}

// Add a delete method
delete(id: number) {
  this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
    if (status === Confirmation.Status.confirm) {
      this.customerService.delete(id).subscribe(() => this.list.get());
    }
  });
}

}
