import { TestBed } from '@angular/core/testing';

import { EncryptDecryptServicesService } from './encrypt-decrypt-services.service';

describe('EncryptDecryptServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncryptDecryptServicesService = TestBed.get(EncryptDecryptServicesService);
    expect(service).toBeTruthy();
  });
});
