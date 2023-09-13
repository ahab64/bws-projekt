import { TestBed } from '@angular/core/testing';

import { KursListeService } from './kurs-liste.service';

describe('KursListeService', () => {
  let service: KursListeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KursListeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
