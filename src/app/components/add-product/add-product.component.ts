import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  formGroup?: FormGroup;
  id: number;
  submitted: boolean = false

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') as string);
  }

  onSave = () => {
    this.submitted = true;
    if (this.formGroup?.invalid) return
    !this.id ? this.productsService.save(this.formGroup?.value).subscribe()
      : this.productsService.updateProduct(this.id, this.formGroup?.value).subscribe();
    this.router.navigate(['/products'])
  }

  ngOnInit(): void {
    !this.id ? this.formGroup = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      selected: [true, Validators.required]
    }) : this.productsService.getOneProduct(this.id).subscribe((p: Product) => {
      this.formGroup = this.fb.group({
        name: [p.name, Validators.required],
        price: [p.price, Validators.required],
        quantity: [p.quantity, Validators.required],
        selected: [p.selected, Validators.required],
      })
    });
  }
}
