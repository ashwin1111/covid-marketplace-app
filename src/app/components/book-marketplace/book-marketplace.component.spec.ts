import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMarketplaceComponent } from './book-marketplace.component';

describe('BookMarketplaceComponent', () => {
  let component: BookMarketplaceComponent;
  let fixture: ComponentFixture<BookMarketplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookMarketplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
