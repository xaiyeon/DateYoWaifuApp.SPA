/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WaifuListComponent } from './waifu-list.component';

describe('WaifuListComponent', () => {
  let component: WaifuListComponent;
  let fixture: ComponentFixture<WaifuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaifuListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaifuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
