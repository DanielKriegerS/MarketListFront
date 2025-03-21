import { Component, OnInit } from '@angular/core';
import { MarketList } from '../../models/MarketList';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketListService } from '../../services/market-list.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FinishedMarketList } from '../../models/FinishedMarketList';
import { FinishedMarketListService } from '../../services/finished-market-list.service';

@Component({
  selector: 'app-market-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './market-list.component.html',
  styleUrl: './market-list.component.scss'
})
export class MarketListComponent implements OnInit {
  lista?: MarketList;
  itemId?: string;
  editState: { [key: string]: boolean } = {};
  rawPriceInput: { [key: string]: number } = {};
  rawQuantityInput: { [key: string]: string } = {};
  rawNameInput: { [key: string]: string } = {};
  selectedItems: { [key: string]: boolean } = {}; 
  totalPrice: { [key: string]: number} = {}; 
  priceInputs: { [key: string]: string } = {};

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
  
        this.lista?.items.forEach(item => {
          item.price = item.price ?? 0;
          item.quantity = item.quantity ?? 0;
          this.rawPriceInput[item.name] = item.price;
          this.rawQuantityInput[item.name] = item.quantity.toString();
          this.rawNameInput[item.name] = item.name; 
          this.priceInputs[item.name] = this.getFormattedPrice(item.name);
        });
      });
    }
  }
    
  toggleEdit(itemName: string) {
    this.editState[itemName] = !this.editState[itemName];
  
    if (!this.editState[itemName]) {
      const item = this.lista?.items.find(item => item.name === itemName);
      if (item) {
        if (!this.rawNameInput[itemName]) {
          this.rawNameInput[itemName] = item.name;
          alert("O nome deve ser preenchido");
          return;
        }

        item.price = this.rawPriceInput[itemName] ?? 0;
        item.quantity = parseInt(this.rawQuantityInput[itemName]) || 0;
        item.name = this.rawNameInput[itemName] ?? item.name; 
  
        this.rawPriceInput[itemName] = item.price;
        this.rawQuantityInput[itemName] = item.quantity.toString();
        this.updateTotal();
      }
    }
  }
     
  confirmEdit(itemName: string) {
    this.toggleEdit(itemName);
    this.updateTotal(); 
  }
  
  updatePriceInput(itemName: string, event: any) {
    let value = event.target.value.replace(/[^0-9,]/g, "").replace(',', '.'); 
    this.rawPriceInput[itemName] = parseFloat(value) || 0;
    this.updateTotal(); 
  }
  
  updateQuantityInput(itemName: string, event: any) {
    let value = event.target.value.replace(/[^0-9]/g, "");
    this.rawQuantityInput[itemName] = value;
    this.updateTotal();
  }
  
  handlePriceFocus(itemName: string) {
    this.priceInputs[itemName] = this.rawPriceInput[itemName].toString().replace('.', ',');
  }

  handlePriceBlur(itemName: string) {
    let rawValue = this.priceInputs[itemName].replace(',', '.'); 
    this.rawPriceInput[itemName] = parseFloat(rawValue) || 0; 
    this.priceInputs[itemName] = this.getFormattedPrice(itemName);
  }

  handleQuantityFocus(itemName: string) {
    if (this.rawQuantityInput[itemName] === "0") {
      this.rawQuantityInput[itemName] = "";
    }
  }

  handleQuantityBlur(itemName: string) {
    if (!this.rawQuantityInput[itemName]) {
      this.rawQuantityInput[itemName] = "0";
    }
  }

  getFormattedPrice(itemName: string): string {
    const price = this.rawPriceInput[itemName] ?? 0;
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  }   

  updateNameInput(itemName: string, event: any) {
    this.rawNameInput[itemName] = event?.target.value;
  }
  
  parseNumber(value: string): number {
    return parseFloat(value) || 0;
  }
  
  formatNumber(value: number): number {
    return Number(value.toFixed(2)); 
  }
  
  getFormattedQuantity(itemName: string): string {
    return this.rawQuantityInput[itemName];
  }

  addItem() {
    const newItem = {
      name: 'Novo Item',
      price: 0,
      quantity: 0
    };

    if (this.lista) {
      this.lista.items.push(newItem);

      this.rawNameInput[newItem.name] = newItem.name;
      this.rawPriceInput[newItem.name] = 0.00;
      this.rawQuantityInput[newItem.name] = newItem.quantity.toString();
    }
  }

  toggleItemSelection(itemName: string) {
    this.selectedItems[itemName] = !this.selectedItems[itemName];
  }
  
  removeItems() {
    if (this.lista) {
      this.lista.items = this.lista.items.filter(item => !this.selectedItems[item.name]);
      this.selectedItems = {};
    }

    this.updateTotal();
  }

  calculateTotal() {
    let total = 0;
    if (this.lista) {
      this.lista.items.forEach(item => {
        const itemPrice = this.rawPriceInput[item.name]; 
        const itemQuantity = parseInt(this.rawQuantityInput[item.name]) || 0;
        
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
