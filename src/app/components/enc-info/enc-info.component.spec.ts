import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncInfoComponent } from './enc-info.component';

describe('EncInfoComponent', () => {
  let component: EncInfoComponent;
  let fixture: ComponentFixture<EncInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncInfoComponent]
    });
    fixture = TestBed.createComponent(EncInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
