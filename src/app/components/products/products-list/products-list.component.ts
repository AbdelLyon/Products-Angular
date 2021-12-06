import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionEvent, AppDataState, DataStateEnum, Product, ProductActionEnum } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  @Input() public products?: Observable<AppDataState<Product[]>>;
  readonly DataStateEnum = DataStateEnum;
  @Output() private eventEmitter: EventEmitter<ActionEvent> = new EventEmitter();

  constructor() { }

  onDelete = (product: Product) => this.eventEmitter.emit({ type: ProductActionEnum.DELETE_PRODUCT, payload: product })
  onSelect = (product: Product) => this.eventEmitter.emit({ type: ProductActionEnum.SELECT_PRODUCT, payload: product })
  onUpdate = (product: Product) => this.eventEmitter.emit({ type: ProductActionEnum.UPDATE_PRODUCT, payload: product })
}
