import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarketList } from '../models/MarketList';
import { environment } from '../../environments/environment';
import { ListSummaryDTO } from '../models/ListSummaryDTO';

@Injectable({
  providedIn: 'root'
})
export class FinishedMarketListService {
  finishedEndpoint: string =  `${environment.apiUrl}/market-lists`;
  constructor(private http: HttpClient) { }

  getFinishedMarketLists(): Observable<ListSummaryDTO[]> {
    return this.http.get<ListSummaryDTO[]>(`${this.finishedEndpoint}/finished-lists`);
  }

  getFinishedMarketListById(id: string): Observable<MarketList> {
    return this.http.get<MarketList>(`${this.finishedEndpoint}/${id}`);
  }

  finishList(id: string){
    return this.http.patch<MarketList>(`${this.finishedEndpoint}/${id}`, {});
  }
}
