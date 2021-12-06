import { Component, EventEmitter, Output } from '@angular/core';
import { ActionEvent, ProductActionEnum } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent {

  @Output() private eventEmitter: EventEmitter<ActionEvent> = new EventEmitter();

  constructor() { }

  onGetAllProducts = () => this.eventEmitter.emit({ type: ProductActionEnum.GET_ALL_PRODUCTS })
  onGetSelectedProducts = () => this.eventEmitter.emit({ type: ProductActionEnum.GET_SELECTED_PRODUCTS })
  onGetAvailableProducts = () => this.eventEmitter.emit({ type: ProductActionEnum.GET_AVAILABLE_PRODUCTS })
  onAddProduct = () => this.eventEmitter.emit({ type: ProductActionEnum.ADD_PRODUCT })
  onSearchProducts = (dataForm: any) => this.eventEmitter.emit({ type: ProductActionEnum.SEARCH_PRODUCT, payload: dataForm })
}
