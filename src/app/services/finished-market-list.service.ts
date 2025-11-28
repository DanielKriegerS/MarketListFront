import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MarketList } from '../models/MarketList';
import { environment } from '../../environments/environment';
import { ListSummaryDTO } from '../models/ListSummaryDTO';
import { HateoasCollection } from '../models/hateoas-collection.model';

@Injectable({
  providedIn: 'root'
})
export class FinishedMarketListService {
  finishedEndpoint: string =  `${environment.apiUrl}/market-lists`;
  constructor(private http: HttpClient) { }

  getFinishedLists(): Observable<ListSummaryDTO[]> {
    return this.http.get<HateoasCollection<ListSummaryDTO[]>>(`${this.finishedEndpoint}/finished-lists`).pipe(
          map((response) => {
            if (!response || !response._embedded) {
              return [] as ListSummaryDTO[];
            }
            
            const embeddedKey = Object.keys(response._embedded)[0];
            return response._embedded[embeddedKey].map((resource: any) => {
              const {_links, ...entity} = resource;
              return entity as ListSummaryDTO;
            });
          })
        );
  }

  getFinishedMarketListById(id: string): Observable<MarketList> {
    return this.http.get<MarketList>(`${this.finishedEndpoint}/${id}`);
  }

  finishList(id: string){
    return this.http.patch<MarketList>(`${this.finishedEndpoint}/${id}`, {});
  }
}
