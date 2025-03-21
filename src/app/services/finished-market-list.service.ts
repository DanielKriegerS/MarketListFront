import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FinishedMarketList } from '../models/FinishedMarketList';

@Injectable({
  providedIn: 'root'
})
export class FinishedMarketListService {
   finishedEndpoint: string = 'http://localhost:8080/finished-market-lists';

  constructor(private http: HttpClient) { }

  saveFinishedMarketList(finishedList: FinishedMarketList): Observable<FinishedMarketList> {
    return this.http.post<FinishedMarketList>(this.finishedEndpoint, finishedList);
  }

  getFinishedMarketLists(): Observable<FinishedMarketList[]> {
    return this.http.get<FinishedMarketList[]>(this.finishedEndpoint);
  }

  getFinishedMarketListById(id: string): Observable<FinishedMarketList> {
    return this.http.get<FinishedMarketList>(`${this.finishedEndpoint}/${id}`);
  }
}
