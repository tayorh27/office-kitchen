import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignupsComponent } from './user-signups.component';

describe('UserSignupsComponent', () => {
  let component: UserSignupsComponent;
  let fixture: ComponentFixture<UserSignupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSignupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
