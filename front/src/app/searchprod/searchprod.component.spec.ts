import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchprodComponent } from './searchprod.component';

describe('SearchprodComponent', () => {
  let component: SearchprodComponent;
  let fixture: ComponentFixture<SearchprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchprodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
