import { TestBed } from '@angular/core/testing';
import { CsvParserService } from './csv-upload.service';

describe('CsvParserService', () => {
  let service: CsvParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse a CSV file', (done: DoneFn) => {
    // Create a mock File object with sample CSV data
    const csvData = 'Name,Email,Role\nJohn,Doe,Student\nJane,Smith,Teacher\n';
    const blob = new Blob([csvData], { type: 'text/csv' });
    const file = new File([blob], 'test.csv');

    service.parseCSV(file).then((data) => {
      // Assert that the data has been parsed correctly
      expect(data).toEqual([
        ['Name', 'Email', 'Role'],
        ['John', 'Doe', 'Student'],
        ['Jane', 'Smith', 'Teacher'],
      ]);
      done();
    });
  });

  it('should handle errors when reading an invalid CSV file', (done: DoneFn) => {
    // Create a mock invalid File object
    const invalidBlob = new Blob(['Invalid,CSV,Data\nMissing Quotes'], { type: 'text/csv' });
    const invalidFile = new File([invalidBlob], 'invalid.csv');

    service.parseCSV(invalidFile).catch((error) => {
      // Assert that an error message is received
      expect(error).toBe('Error reading CSV file.');
      done();
    });
  });
});
function beforeEach(arg0: () => void) {
  throw new Error('Function not implemented.');
}

function expect(service: CsvParserService) {
  throw new Error('Function not implemented.');
}

