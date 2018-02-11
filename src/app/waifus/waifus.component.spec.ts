/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WaifusComponent } from './waifus.component';

describe('WaifusComponent', () => {
  let component: WaifusComponent;
  let fixture: ComponentFixture<WaifusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaifusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaifusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
