import { Component, OnInit, Input, OnChanges, AfterContentInit } from '@angular/core';
import { Category } from 'src/app/models/categoryModel/category.model';
import { Item } from 'src/app/models/itemModel/item.model';
import { ItemsService } from 'src/app/services/itemService/items.service';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { InventoryList } from 'src/app/models/inventoryListModel/inventory-list.model';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit, OnChanges {
  category?: Category[];
  items: Item[] = [];
  @Input() inventoryList?: InventoryList[];

  constructor(private itemService: ItemsService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.retrieveCategories()
  }

  ngOnChanges(): void {
    this.retrieveItems()
  }

  retrieveCategories() {
    this.categoryService.getAll()
      .subscribe({
        next: (data) => {
          this.category = data;
        },
        error: (e) => console.error(e)
      });
  }

  retrieveItems() {
    console.log(this.inventoryList)
    if (this.inventoryList != null) {
      this.items = []
      for (let i = 0; i < this.inventoryList.length; i++) {
        this.itemService.get(this.inventoryList[i].item_id)
          .subscribe({
            next: (data) => {
              this.items[i] = data
              console.log(data)
            },
            error: (e) => console.error(e)
          })
      }
    }
  }

}