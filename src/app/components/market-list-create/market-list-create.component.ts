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
  marketList: MarketList = {id:'', description: '', items: [], createDate: 0, totalValue: 0.00 };
  newItemName: string = '';

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
    if (!this.marketList.description.trim() || this.marketList.items.length === 0) {
      alert('A lista precisa ter uma descrição e pelo menos um item.');
      return;
    }

    this.service.marketList = this.marketList; 
    this.service.createMarketList(); 

    const date = this.marketList.createDate;

    this.marketList = { id:'', description: '', items: [], createDate: 0, totalValue: 0.00 };
    
  }
}