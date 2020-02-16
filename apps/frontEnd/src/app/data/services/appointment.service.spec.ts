import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { environment } from '@env';
import { AppointmentService } from './appointment.service';
const apiUrl = environment.baseUrl + 'appointment';
import { CookieService } from 'ngx-cookie-service';

describe('AppointmentService', () => {
  let httpTestingController: HttpTestingController;
  let service: AppointmentService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppointmentService, CookieService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(AppointmentService);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#newBroadcast()', () => {
    it('returned Observable should match the right data', () => {
      const mockAppointment = {
        category: 'Smart Watches',
        textMessage: 'Test Message'
      };

      service.getAppointmentById('5dd0cb1f55f5083f4c17e8fb').subscribe(data => {
        expect('data').toEqual('data');
      });

      const req = httpTestingController.expectOne(
        '/api/appointment/5dd0cb1f55f5083f4c17e8fb'
      );

      expect(req.request.method).toEqual('GET');

      req.flush(mockAppointment);
    });
  });

  // it('should be created', () => {
  //   const service: AppointmentService = TestBed.get(AppointmentService);
  //   expect(service).toBeTruthy();
  // });
});
