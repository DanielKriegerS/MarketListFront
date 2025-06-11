import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarketList } from '../models/MarketList';
import { ListSummaryDTO } from '../models/ListSummaryDTO';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HateoasCollection } from '../models/hateoas-collection.model';


@Injectable({
  providedIn: 'root'
})
export class MarketListService {
   marketList: MarketList = {id:'', description: '', items: [], date: '', totalValue: 0.00, isFinished: false};
   ListSummary: ListSummaryDTO = {id:'', description: '', date: '', totalValue: 0.00, totalItems: 0, isFinished: false};
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

  getOpenMarketLists(): Observable<ListSummaryDTO[]> {
    return this.http.get<HateoasCollection<ListSummaryDTO[]>>(`${this.endpoint}/open-lists`).pipe(
      map((response) => {
        const embeddedKey = Object.keys(response._embedded)[0];
        return response._embedded[embeddedKey].map((resource: any) => {
          const {_links, ...entity} = resource;
          return entity as ListSummaryDTO;
        });
      })
    );
  }

  getMarketListById(id: string): Observable<MarketList> {
    return this.http.get<MarketList>(`${this.endpoint}/${id}`);
  }

  updateMarketList(id: string, updatedList: MarketList): Observable<MarketList> {
    return this.http.put<MarketList>(`${this.endpoint}/${id}`, updatedList);
  }  
}
