import { Component } from '@angular/core';
import { FinishedMarketList } from '../../models/FinishedMarketList';
import { ActivatedRoute } from '@angular/router';
import { FinishedMarketListService } from '../../services/finished-market-list.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finished-market-list',
  imports: [CommonModule],
  templateUrl: './finished-market-list.component.html',
  styleUrls: ['./finished-market-list.component.css']
})
export class FinishedMarketListComponent {
  list!: FinishedMarketList | null;

  constructor(
    private route: ActivatedRoute,
    private finishedMarketListService: FinishedMarketListService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.finishedMarketListService.getFinishedMarketListById(id).subscribe(data => {
        this.list = data;
      });
    }
  }
}
