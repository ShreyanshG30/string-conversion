import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonConversionComponent } from './json-conversion.component';

describe('JsonConversionComponent', () => {
  let component: JsonConversionComponent;
  let fixture: ComponentFixture<JsonConversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonConversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
