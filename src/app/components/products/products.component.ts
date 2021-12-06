import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { AppDataState, DataStateEnum } from 'src/app/state/Product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products?: Observable<AppDataState<Product[]>>;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productsService: ProductsService, private router: Router) { }

  getDatas = (methodeService: any) => this.products = methodeService.pipe(
    map((data: Product[]) => {
      data.forEach(p => {
        p.quantity > 0 ? p.available = true : p.available = false;
        this.productsService.selectProducts(p).subscribe();
      });
      return ({ dataState: DataStateEnum.LOADED, data })
    }),
    startWith({ dataState: DataStateEnum.LOADING }),
    catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
  )

  handleDatas = (p: Product, e: any) => {
    if (e.target.textContent === "Supprimer") {
      const response = confirm("êtes-vous sûr de vouloir supprimer le produit nº " + p.id)
      if (response) this.productsService.deleteProduct(p).subscribe(() => this.onGetAllProducts())
    } else {
      p.selected = !p.selected;
      this.productsService.selectProducts(p).subscribe(() => this.productsService.getAllProducts())
    }
  }

  onGetAllProducts = () => this.getDatas(this.productsService.getAllProducts())
  onGetSelectedProducts = () => this.getDatas(this.productsService.getSelectedProducts())
  onGetAvailableProducts = () => this.getDatas(this.productsService.getAvailableProducts())
  onSearchProducts = (dataForm: any) => this.getDatas(this.productsService.searchProducts(dataForm.keyword));
  onDelete = (p: Product, e: Event) => this.handleDatas(p, e)
  onSelect = (p: Product, e: Event) => this.handleDatas(p, e)
  onAddProduct = () => this.router.navigate(['/addProduct'])
  onUpdate = (p: Product, e: Event) => this.router.navigate(['/addProduct/' + p.id])

  ngOnInit(): void { }
}
