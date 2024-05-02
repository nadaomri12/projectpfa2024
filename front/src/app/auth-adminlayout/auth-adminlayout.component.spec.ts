import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAdminlayoutComponent } from './auth-adminlayout.component';

describe('AuthAdminlayoutComponent', () => {
  let component: AuthAdminlayoutComponent;
  let fixture: ComponentFixture<AuthAdminlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthAdminlayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthAdminlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
