import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarketList } from '../models/MarketList';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketListService {
   marketList: MarketList = {id:'', description: '', items: [], date: '', totalValue: 0.00, isFinished: false};
   endpoint: string =  `${environment.apiUrl}/market-lists`;

  constructor(private http: HttpClient) { }

  createMarketList() {
    this.http.post<MarketList>(this.endpoint, this.marketList)
    .subscribe(response => {
      this.marketList = response;
      alert('Lista criada com sucesso!');
    }, error => {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar a lista.');
    });
  }

  getMarketLists(): Observable<MarketList[]> {
    console.log(this.endpoint)
    return this.http.get<MarketList[]>(this.endpoint);
  }

  getMarketListById(id: string): Observable<MarketList> {
    return this.http.get<MarketList>(`${this.endpoint}/${id}`);
  }

  updateMarketList(id: string, updatedList: MarketList): Observable<MarketList> {
    return this.http.put<MarketList>(`${this.endpoint}/${id}`, updatedList);
  }  
}
