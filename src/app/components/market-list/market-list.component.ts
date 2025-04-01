import { Component, OnInit } from '@angular/core';
import { MarketList } from '../../models/MarketList';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketListService } from '../../services/market-list.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FinishedMarketList } from '../../models/FinishedMarketList';
import { FinishedMarketListService } from '../../services/finished-market-list.service';
import { Item } from '../../models/Item';

@Component({
  selector: 'app-market-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './market-list.component.html',
  styleUrl: './market-list.component.scss'
})
export class MarketListComponent implements OnInit {
  lista?: MarketList;
  itemId?: string;
  editState: { [key: number]: boolean } = {};
  rawPriceInput: { [key: number]: number } = {};
  rawQuantityInput: { [key: number]: string } = {};
  rawNameInput: { [key: number]: string } = {};
  selectedItems = new Set<Item>(); 
  totalPrice: { [key: number]: number} = {}; 
  priceInputs: { [key: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private marketListService: MarketListService,
    private finishedMarketListService: FinishedMarketListService 
  ) {}
  

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
  
    if (id) {
      this.itemId = id;
      this.marketListService.getMarketListById(id).subscribe((data) => {
        this.lista = data;
  
        this.lista?.items.forEach((item, index) => {
          item.price = item.price ?? 0;
          item.quantity = item.quantity ?? 0;
  
          this.rawPriceInput[index] = item.price;
          this.rawQuantityInput[index] = item.quantity.toString();
          this.rawNameInput[index] = item.name; 
          this.priceInputs[index] = this.getFormattedPrice(index);  
        });
      });
    }
  }
  
  toggleEdit(index: number) {
    this.editState[index] = !this.editState[index];
  
    if (this.editState[index]) return;
  
    if (!this.lista) return;
    
    const item = this.lista.items[index];
    if (!item) return;
  
    if (!this.rawNameInput[index]?.trim()) {
      alert("O nome deve ser preenchido");
      this.rawNameInput[index] = item.name;
      return;
    }
  
    const updatedPrice = this.rawPriceInput[index] || 0;
    const updatedQuantity = parseInt(this.rawQuantityInput[index]) || 0;
  
    item.price = updatedPrice;
    item.quantity = updatedQuantity;
    item.name = this.rawNameInput[index].trim();
  
    this.rawPriceInput[index] = parseFloat(updatedPrice.toFixed(2));
    this.rawQuantityInput[index] = updatedQuantity.toString();
  
    this.updateTotal();
  }
    
  confirmEdit(index: number) {
    this.toggleEdit(index);
    this.updateTotal();
  }  
  
  updatePriceInput(index: number, event: any) {
    let value = event.target.value.replace(/[^0-9,]/g, "").replace(',', '.'); 
    this.rawPriceInput[index] = parseFloat(value) || 0;
    this.updateTotal(); 
  }
  
  updateQuantityInput(index: number, event: any) {
    let value = event.target.value.replace(/[^0-9]/g, "");
    this.rawQuantityInput[index] = value;
    this.updateTotal();
  }
  
  handlePriceFocus(index: number) {
    this.priceInputs[index] = this.rawPriceInput[index].toString().replace('.', ',');
  }

  handlePriceBlur(index: number) {
    let rawValue = this.priceInputs[index].replace(',', '.'); 
    this.rawPriceInput[index] = parseFloat(rawValue) || 0; 
    this.priceInputs[index] = this.getFormattedPrice(index);
  }

  handleQuantityFocus(index: number) {
    if (this.rawQuantityInput[index] === "0") {
      this.rawQuantityInput[index] = "";
    }
  }

  handleQuantityBlur(index: number) {
    if (!this.rawQuantityInput[index]) {
      this.rawQuantityInput[index] = "0";
    }
  }

  getFormattedPrice(index: number): string {
    const price = this.rawPriceInput[index] ?? 0;
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  }   

  updateNameInput(index: number, event: any) {
    this.rawNameInput[index] = event?.target.value;
  }
  
  parseNumber(value: string): number {
    return parseFloat(value) || 0;
  }
  
  formatNumber(value: number): number {
    return Number(value.toFixed(2)); 
  }
  
  getFormattedQuantity(index: number): string {
    return this.rawQuantityInput[index];
  }

  addItem() {
    const newItem = {
      name: 'Novo Item',
      price: 0,
      quantity: 0
    };

    if (this.lista) {
      this.lista.items.push(newItem);

      const newIndex = this.lista.items.length - 1;

      this.rawNameInput[newIndex] = newItem.name;
      this.rawPriceInput[newIndex] = 0.00;
      this.rawQuantityInput[newIndex] = newItem.quantity.toString();
    }
  }

  toggleItemSelection(item: Item) {
    if (this.selectedItems.has(item)) {
      this.selectedItems.delete(item);
    } else {
      this.selectedItems.add(item);
    }
  }

  removeItems() {
    if (!this.lista) return;
  
    this.lista.items = this.lista.items.filter((item) => !this.selectedItems.has(item));
  
    this.selectedItems.clear();
  
    this.rawNameInput = {};
    this.rawPriceInput = {};
    this.rawQuantityInput = {};
    this.priceInputs = {};
    
    this.lista.items.forEach((item, index) => {
      this.rawNameInput[index] = item.name;
      this.rawPriceInput[index] = parseFloat(item.price.toFixed(2));
      this.rawQuantityInput[index] = item.quantity.toString();
      this.priceInputs[index] = this.getFormattedPrice(index);
    });
  
    this.updateTotal();
  }

  calculateTotal() {
    let total = 0;
    if (this.lista) {
      this.lista.items.forEach((item, index) => {
        const itemPrice = this.rawPriceInput[index]; 
        const itemQuantity = parseInt(this.rawQuantityInput[index]) || 0;
        
        if (itemQuantity > 0) {
          total += itemPrice * itemQuantity;
        }
      });
    }
    return this.formatNumber(total); 
  }
    
  updateTotal() {
    if (this.lista) {
      const total = this.calculateTotal();
      this.lista.totalValue = total; 
    }
  }

  saveList() {
    if (!this.lista || this.lista.items.length === 0) {
      alert('Não há itens na lista para salvar.');
      return;
    }
  
    if (this.lista.id) {
      this.marketListService.updateMarketList(this.lista.id, this.lista)
        .subscribe(response => {
          alert('Lista salva com sucesso!');
        }, error => {
          console.error('Erro ao atualizar a lista:', error);
          alert('Erro ao atualizar a lista.');
        });
    } else {
      this.marketListService.createMarketList();
    }
  }
      
  finalizeShopping() {
    if (!this.lista || this.lista.items.length === 0) {
      alert('Não há itens na lista para finalizar a compra.');
      return;
    }
  
    const itensInvalidos = this.lista.items.filter(item => 
      !item.name.trim() || !item.quantity || !item.price
    );
  
    if (itensInvalidos.length > 0) {
      alert('Todos os itens precisam ter nome, quantidade e preço válidos.');
      return;
    }

    const listaFinalizada: FinishedMarketList = {
      id: this.lista.id,
      description: this.lista.description,
      items: this.lista.items,
      finishDate: new Date().toISOString(),
      totalValue: this.lista.items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
    };
  
    this.finishedMarketListService.saveFinishedMarketList(listaFinalizada).subscribe({
      next: () => {
        if (this.itemId) {
          this.marketListService.finishMarketList(this.itemId).subscribe(
            () => {
            },
            (error) => {
              console.error('Erro ao remover lista das abertas:', error);
            }
          );
        }
  
        alert('Compra finalizada com sucesso!');
        this.router.navigate(['/']); 
      },
      error: () => {
        alert('Erro ao finalizar a compra. Tente novamente.');
      }
    });
  }  
}  
