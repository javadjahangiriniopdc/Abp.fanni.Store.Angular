import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { ProductService, ProductDto, productTypeOptions } from '@proxy/products';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ListService],
})
export class ProductComponent implements OnInit {
  product = { items: [], totalCount: 0 } as PagedResultDto<ProductDto>;
  form: FormGroup; // add this line
  // add bookTypes as a list of BookType enum members
  productTypes = productTypeOptions;
  isModalOpen = false; // add this line
  constructor(public readonly list: ListService,
    private productService: ProductService,
    private fb: FormBuilder // inject FormBuilde
  ) { }

  ngOnInit(): void {
    const productStreamCreator = (query) => this.productService.getList(query);

    this.list.hookToQuery(productStreamCreator).subscribe((response) => {
      this.product = response;
    });
  }

  // add new method
  createProduct() {
    this.buildForm(); // add this line
    this.isModalOpen = true;
  }
  // add buildForm method
  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      productType: [null, Validators.required],
      pirce: [null, Validators.required],
    });
  }

  // add save method
  save() {
    if (this.form.invalid) {
      return;
    }

    this.productService.create(this.form.value).subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

}
