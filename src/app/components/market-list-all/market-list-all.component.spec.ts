import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketListAllComponent } from './market-list-all.component';

describe('MarketListAllComponent', () => {
  let component: MarketListAllComponent;
  let fixture: ComponentFixture<MarketListAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketListAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
