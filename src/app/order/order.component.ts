import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { OrderService, OrderDto, CustomerLookupDto,ProductLookupDto } from '@proxy/orders';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { map } from 'rxjs/operators';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [ListService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter } ],
})
export class OrderComponent implements OnInit {
  order = { items: [], totalCount: 0 } as PagedResultDto<OrderDto>;
  form: FormGroup;
  selectedOrder = {} as OrderDto;
  customers$: Observable<CustomerLookupDto[]>;
  products$: Observable<ProductLookupDto[]>;

  isModalOpen = false;
  constructor(public readonly list: ListService,
     private orderService: OrderService,
     private fb: FormBuilder,
     private confirmation: ConfirmationService ) { 
      this.customers$ = orderService.getCustomerLookup().pipe(map((r) => r.items));
      this.products$ = orderService.getProductLookup().pipe(map((r) => r.items));
     }

  ngOnInit(): void {
    const orderStreamCreator = (query) => this.orderService.getList(query);

    this.list.hookToQuery(orderStreamCreator).subscribe((response) => {
      this.order = response;
    });
  }

  createBook() {
    this.selectedOrder = {} as OrderDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editBook(id: string) {
    this.orderService.get(id).subscribe((order) => {
      this.selectedOrder = order;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      customerId: [this.selectedOrder.customerId || null, Validators.required],
      productId: [this.selectedOrder.productId || null, Validators.required],
      description: [this.selectedOrder.description || null, Validators.required],
      count: [this.selectedOrder.count || null, Validators.required],
      pirce: [this.selectedOrder.pirce || null, Validators.required],
      priceAll: [this.selectedOrder.priceAll || null, Validators.required],
      orderDate: [
        this.selectedOrder.orderDate ? new Date(this.selectedOrder.orderDate) : null,
        Validators.required,
      ],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedOrder.id
      ? this.orderService.update(this.selectedOrder.id, this.form.value)
      : this.orderService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', 'AbpAccount::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.orderService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

}
