import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketListCreateComponent } from './market-list-create.component';

describe('MarketListCreateComponent', () => {
  let component: MarketListCreateComponent;
  let fixture: ComponentFixture<MarketListCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketListCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketListCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
