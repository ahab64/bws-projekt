import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvUploadComponent } from './csv-upload.component';

describe('CsvUploadComponent', () => {
  let component: CsvUploadComponent;
  let fixture: ComponentFixture<CsvUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsvUploadComponent]
    });
    fixture = TestBed.createComponent(CsvUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
