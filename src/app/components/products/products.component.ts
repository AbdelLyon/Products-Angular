import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { AppDataState, DataStateEnum } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products?: Observable<AppDataState<Product[]>>;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productsService: ProductsService, private router: Router) { }

  getDatas = (observableService: Observable<Product[]>) => this.products = observableService.pipe(
    map((data: Product[]) => ({ dataState: DataStateEnum.LOADED, data })),
    startWith({ dataState: DataStateEnum.LOADING }),
    catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
  )

  handleDatas = (p: Product, action: string) => {
    if (action === "DELETE") {
      const response = confirm("êtes-vous sûr de vouloir supprimer le produit nº " + p.id)
      if (response) this.productsService.deleteProduct(p).subscribe(() => this.onGetAllProducts())
    } else {
      p.selected = !p.selected;
      this.productsService.updateDetailsProduct(p).subscribe(() => this.productsService.getAllProducts())
    }
  }

  onGetAllProducts = () => this.getDatas(this.productsService.getAllProducts())
  onGetSelectedProducts = () => this.getDatas(this.productsService.getSelectedProducts())
  onGetAvailableProducts = () => this.getDatas(this.productsService.getAvailableProducts())
  onSearchProducts = (dataForm: any) => this.getDatas(this.productsService.searchProducts(dataForm.keyword));
  onDelete = (p: Product) => this.handleDatas(p, "DELETE")
  onSelect = (p: Product) => this.handleDatas(p, "SELECT")
  onAddProduct = () => this.router.navigate(['/addProduct'])
  onUpdate = (p: Product) => this.router.navigate(['/addProduct/' + p.id])

  ngOnInit(): void { }
}
