import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedMarketListComponent } from './finished-market-list.component';

describe('FinishedMarketListComponent', () => {
  let component: FinishedMarketListComponent;
  let fixture: ComponentFixture<FinishedMarketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishedMarketListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedMarketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
