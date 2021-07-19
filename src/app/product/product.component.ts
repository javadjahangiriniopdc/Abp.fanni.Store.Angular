import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { ProductService, ProductDto, productTypeOptions } from '@proxy/products';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ListService],
})
export class ProductComponent implements OnInit {
  product = { items: [], totalCount: 0 } as PagedResultDto<ProductDto>;
  selectedProduct = {} as ProductDto; // declare selectedBook
  form: FormGroup; // add this line
  // add bookTypes as a list of BookType enum members
  productTypes = productTypeOptions;
  isModalOpen = false; // add this line
  constructor(public readonly list: ListService,
    private productService: ProductService,
    private fb: FormBuilder, // inject FormBuilde
    private confirmation: ConfirmationService // inject the ConfirmationService

  ) { }

  ngOnInit(): void {
    const productStreamCreator = (query) => this.productService.getList(query);

    this.list.hookToQuery(productStreamCreator).subscribe((response) => {
      this.product = response;
    });
  }

  // add new method
  createProduct() {
    this.selectedProduct = {} as ProductDto; // reset the selected book
    this.buildForm(); // add this line
    this.isModalOpen = true;
  }
  // Add editBook method
  editBook(id: number) {
    this.productService.get(id).subscribe((book) => {
      this.selectedProduct = book;
      this.buildForm();
      this.isModalOpen = true;
    });
  }
  // add buildForm method
  buildForm() {
    this.form = this.fb.group({
      name: [this.selectedProduct.name || '', Validators.required],
      productType: [this.selectedProduct.productType || null, Validators.required],
      pirce: [this.selectedProduct.pirce || null, Validators.required],
    });
  }

  // change the save method
  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedProduct.id
      ? this.productService.update(this.selectedProduct.id, this.form.value)
      : this.productService.create(this.form.value);

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
      this.productService.delete(id).subscribe(() => this.list.get());
    }
  });
}

}
