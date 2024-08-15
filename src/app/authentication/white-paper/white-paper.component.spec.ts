import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitePapperComponent } from './white-paper.component';

describe('WhitePapperComponent', () => {
  let component: WhitePapperComponent;
  let fixture: ComponentFixture<WhitePapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhitePapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhitePapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
