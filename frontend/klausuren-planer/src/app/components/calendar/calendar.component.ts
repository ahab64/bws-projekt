import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { CalendarService } from 'src/app/services/calendar.service';
import { KlausurEvent } from 'src/app/models/event.model';
import deLocale from '@fullcalendar/core/locales/de';
import { deLocale as _deLocale } from 'ngx-bootstrap/locale';
import { User } from 'src/app/models/user.model';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Calendar } from '@fullcalendar/core';
import { defineLocale } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  failedLoadingEvents: boolean = false;
  isAddEventPopupOpen: boolean = false;
  user: User;
  rawEvents: KlausurEvent[] = [];
  calendarForm: FormGroup;
  locale = 'de';
  minTime: Date = new Date();
  isInValid: boolean = false;
  @ViewChild('fullcalendar') fullcalendar: any

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    locale: deLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    weekends: false,
    initialView: 'timeGridWeek',
    businessHours: true,
    events: [],
  };

  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-dark-blue',
    dateInputFormat: 'DD.MM.YYYY',
    minDate: new Date(),
  };

  constructor(
    private calendarService: CalendarService,
    private dataSharingService: DataSharingService,
    private fb: FormBuilder,
    private localeService: BsLocaleService
  ) {
    this.user = this.dataSharingService.getUser();
    defineLocale('de', _deLocale);
    this.localeService.use(this.locale);
    this.calendarForm = this.fb.group({
      selectedKursEvent: new FormControl('', Validators.required),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', Validators.required),
      dateKlausur: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.loadCalendarEvents();
  }

  async loadCalendarEvents() {
    try {
      this.calendarOptions.events = (
        await this.calendarService.loadEvents()
      ).transformed;
      this.rawEvents = (await this.calendarService.loadEvents()).raw;
    } catch (error) {
      this.failedLoadingEvents = true;
    }
  }

  openEventPopup() {
    this.isAddEventPopupOpen = true;
  }
  closeEventPopup() {
    this.isAddEventPopupOpen = false;
  }

  formatTimeAndDate(date: string, startTime: string, endTime: string) {
    const _date = new Date(date);
    const _startTime = new Date(startTime);
    const _endTime = new Date(endTime);
    const startBeforeEnd = _startTime < _endTime;

    const formattedDate = _date.toISOString().substring(0, 10);
    const formattedStartTime = _startTime.toISOString().substring(11, 23) + 'Z';
    const formattedEndTime = _endTime.toISOString().substring(11, 23) + 'Z';

    return {
      startBeforeEnd: startBeforeEnd,
      start: `${formattedDate}T${formattedStartTime}`,
      end: `${formattedDate}T${formattedEndTime}`,
    };
  }
  addNewEvent() {
    if(!this.calendarForm.valid){
      this.isInValid = true;
    }else{
      this.isInValid = false;
      const title = this.calendarForm.get('selectedKursEvent')?.value;
      const date = this.calendarForm.get('dateKlausur')?.value;
      const startTime = this.calendarForm.get('startTime')?.value;
      const endTime = this.calendarForm.get('endTime')?.value;
      const { startBeforeEnd, start, end } = this.formatTimeAndDate(date, startTime, endTime);
      if(startBeforeEnd){
        this.isInValid =false
        const newEvent = {
          title: `${title[0]} bei ${title[1]}`,
          start: start,
          end: end,
        };
        this.fullcalendar.getApi().addEvent(newEvent);  
        this.isAddEventPopupOpen = false;
      }else {
        this.isInValid = true;
      }
    }
  }

 

  
}
