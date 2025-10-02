import { Component } from '@angular/core';
import { MarketList } from '../../models/MarketList';
import { MarketListItem } from '../../models/MarketListItem';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MarketListService } from '../../services/market-list.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-market-list-create',
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './market-list-create.component.html',
  styleUrl: './market-list-create.component.scss'
})
export class MarketListCreateComponent {
  marketList: MarketList = {id:'', description: '', items: [], date: new Date().toISOString(), totalValue: 0.00, isFinished: false };
  newItemName: string = '';
  isDescBlurred: boolean = false;
  isItemNameBlurred: boolean = false;

  constructor(private service: MarketListService) {}

  addItem() {
    if (this.newItemName.trim()) {
      const newItem: MarketListItem = { name: this.newItemName.trim(), quantity: 0, price: 0.0 };
      this.marketList.items.push(newItem);
      this.newItemName = '';
    }
  }

  removeItem(index: number) {
    this.marketList.items.splice(index, 1);
  }

  saveMarketList() {
    let validList: boolean = this.validateMarketList();
    if (!validList) {
      alert('Favor verificar informações da lista.');
    }

    this.service.marketList = this.marketList; 
    this.service.createMarketList(); 

    this.marketList = { id:'', description: '', items: [], date: '', totalValue: 0.00, isFinished: false };
    
  }

  validateDescription():boolean {
    if (!this.marketList.description.trim()) {
      this.onBlur("description");
      return false;
    }
    this.removeBlur("description");
    return true;
  }

  validateItemName():boolean {
    if (!this.newItemName.trim()) {
      this.onBlur("item");
      return false;
    }
    this.removeBlur("item");
    return true;
  }

  validateMarketList():boolean {
    let validDescription = this.validateDescription();
    let validItems = this.marketList.items.length > 0;

    return validDescription && validItems;
  }

  onBlur(toBlur: string) {
    if (toBlur === "description") {
      this.isDescBlurred = true;
    } else if (toBlur === "item") {
      this.isItemNameBlurred = true;
    }
  }

  removeBlur(toBlur: string) {
    if (toBlur === "description") {
      this.isDescBlurred = false;
    } else if (toBlur === "item") {
      this.isItemNameBlurred = false;
    }
  }
}