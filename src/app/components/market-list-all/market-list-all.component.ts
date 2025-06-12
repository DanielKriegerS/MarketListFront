import { Component } from '@angular/core';
import { MarketListService } from '../../services/market-list.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FinishedMarketListService } from '../../services/finished-market-list.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListSummaryDTO } from '../../models/ListSummaryDTO';

@Component({
  selector: 'app-market-list-all',
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './market-list-all.component.html',
  styleUrl: './market-list-all.component.scss'
})
export class MarketListAllComponent {
  summaryLists: ListSummaryDTO[] = [];
  isFinishedList: boolean = false;

  constructor(
    private marketListService: MarketListService,
    private route: ActivatedRoute,
    private finishedMarketListService: FinishedMarketListService
  ) {}

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.isFinishedList = url.some(segment => segment.path === 'finished-market-list-all');
      this.loadMarketLists();
    });
  }

  loadMarketLists() {
    if (this.isFinishedList) {
      this.finishedMarketListService.getFinishedLists().subscribe(
        data => {
          this.summaryLists = data;
        },
        error => {
          console.error('Erro ao buscar listas finalizadas:', error);
        }
      );
    } else {
      this.marketListService.getOpenMarketLists().subscribe(
        data => {
          this.summaryLists = data;
        },
        error => {
          console.error('Erro ao buscar listas abertas:', error);
        }
      );
    }
  }
}
