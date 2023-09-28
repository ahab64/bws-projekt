//Autor Merlin Burbach
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { CalendarService } from 'src/app/services/calendar.service';
import { KlausurEvent } from 'src/app/models/event.model';
import deLocale from '@fullcalendar/core/locales/de';
import { deLocale as _deLocale } from 'ngx-bootstrap/locale';
import { User } from 'src/app/models/user.model';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { UserRolle } from 'src/app/enums/userRollen.enum';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

//Kalendar Komponente
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  failedLoadingEvents: boolean = false;
  isAddEventPopupOpen: boolean = false;
  isAdminPopUpOpen: boolean = false;
  canEdit: boolean = false;
  isAdmin: boolean = false;
  isInValid: boolean = false;
  isChangeOrDeleteOpen = false;
  updateFormIsDirty: boolean = false;
  failedNewEvent = false;
  updateEvent = {
    klausurId: 0,
    kursId: 0,
    dateStart: '',
    dateEnd: '',
    kurslehrer: '',
    kursname: '',
    selected: true,
  };
  updateDate: Date | undefined = new Date();
  updateStartTime: Date | undefined = new Date();
  updateEndTime: Date | undefined = new Date();
  user: User;
  rawEvents: KlausurEvent[] = [];
  calendarForm: FormGroup;
  locale = 'de';
  minTime: Date = new Date();

  @ViewChild('fullcalendar') fullcalendar: any;
  @Input() adminData: any;

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
    eventClick: this.changeOrDelete.bind(this),
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
    private localeService: BsLocaleService,
    private authService: AuthService
  ) {
    defineLocale('de', _deLocale);
    this.user = this.dataSharingService.getUser();
    this.canEdit = this.user.userRole !== UserRolle.Student;
    this.isAdmin =  this.user.userRole === UserRolle.Admin;
    this.localeService.use(this.locale);
    this.calendarForm = this.fb.group({
      selectedKursEvent: new FormControl('', Validators.required),
      updateKursEvent: new FormControl(''),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', Validators.required),
      dateKlausur: new FormControl('', Validators.required),
      updateDate: new FormControl(''),
      updateStartTime: new FormControl(this.updateStartTime),
      updateEndTime: new UntypedFormControl(this.updateEndTime),
    });
  }

  ngOnInit(): void {
    this.loadCalendarEvents();
  }

  // Lädt die Kalenderereignisse beim Initialisieren der Komponente
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

  // Öffnet das Popup zum Hinzufügen eines neuen Ereignisses
  openEventPopup() {
    this.isAddEventPopupOpen = true;
  }
  // Schließt das Popup zum Hinzufügen eines neuen Ereignisses
  closeEventPopup() {
    this.isAddEventPopupOpen = false;
    this.isChangeOrDeleteOpen = false;
  }

  // Formatiert das Datum und die Uhrzeit für das Hinzufügen eines neuen Ereignisses
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

  // Fügt ein neues Ereignis zum Kalender hinzu und speichert es in der Datenbank
  addNewEvent() {
    if (!this.calendarForm.valid) {
      this.isInValid = true;
    } else {
      this.isInValid = false;
      const title = this.calendarForm.get('selectedKursEvent')?.value;
      const date = this.calendarForm.get('dateKlausur')?.value;
      const startTime = this.calendarForm.get('startTime')?.value;
      const endTime = this.calendarForm.get('endTime')?.value;
      const { startBeforeEnd, start, end } = this.formatTimeAndDate(
        date,
        startTime,
        endTime
      );
      if (startBeforeEnd) {
        this.isInValid = false;
        const newEvent = {
          title: `${title[0]} bei ${title[1]}`,
          start: start,
          end: end,
        };
        const kurs = this.rawEvents.filter(
          (event) => event.kursname === title[0]
        );
        this.addEventToDatabase(kurs[0].id, start, end);
        this.fullcalendar.getApi().addEvent(newEvent);
        this.isAddEventPopupOpen = false;
      } else {
        this.isInValid = true;
      }
    }
  }

  private async addEventToDatabase(
    kursId: number,
    dateStart: string,
    dateEnd: string
  ) {
    try {
      const newEventConfirm = lastValueFrom(
        this.calendarService.addCalendarEvent(kursId, dateStart, dateEnd)
      );
    } catch (error) {
      this.failedNewEvent = true;
    }
  }

  // Öffnet das Popup für administrative Aktionen
  openAdminPopup() {
    this.isAdminPopUpOpen = true;
  }

  // Aktualisiert das Formular, wenn Änderungen vorgenommen werden
  onUpdateChange() {
    this.updateFormIsDirty = true;
  }

  // Öffnet das Popup zum Ändern oder Löschen eines Ereignisses beim Klicken auf ein Ereignis
  changeOrDelete(eventClickInfo: EventClickArg) {

    const start = eventClickInfo.event.start?.toString();
    const end = eventClickInfo.event.end?.toString();

    if (start && end) {
      const startFormated = this.calendarService.formartTimeString(start);
      const endFormated = this.calendarService.formartTimeString(end);
      const words = eventClickInfo.event.title.split(' ');

      this.updateEvent.klausurId = parseInt(eventClickInfo.event._def.groupId);
      this.updateEvent.kursId = parseInt(eventClickInfo.event._def.publicId);
      this.updateEvent.dateStart = startFormated;
      this.updateEvent.dateEnd = endFormated;
      this.updateEvent.kursname = words[0];
      this.updateEvent.kurslehrer = words[2];
      this.updateDate = new Date(this.updateEvent.dateStart.substring(0, 10));

      const startTime =
        this.calendarService.extractHoursAndMinutes(startFormated);
      const endTime = this.calendarService.extractHoursAndMinutes(endFormated);

      this.updateStartTime?.setHours(startTime.hours);
      this.updateStartTime?.setMinutes(startTime.minutes);
      this.updateEndTime?.setHours(endTime.hours);
      this.updateEndTime?.setMinutes(endTime.minutes);

      this.isChangeOrDeleteOpen = true;
    }
  }

  // Löscht ein ausgewähltes Kalenderereignis
  async deleteEvent() {
    const klausurId = this.updateEvent.klausurId;
    try {
      lastValueFrom(this.calendarService.deleteCalendarEvent(klausurId));
      this.isChangeOrDeleteOpen = false;
    } catch (error) {
      this.isInValid = true;
    } finally {
      this.loadCalendarEvents()
      this.fullcalendar.getApi().render();
    }
  }
  // Aktualisiert ein ausgewähltes Kalenderereignis
  async updateKlausurEvent() {
    const klausurId = this.updateEvent.klausurId;
    const date = this.calendarForm.get('updateDate')?.value;
    const startTime = this.calendarForm.get('updateStartTime')?.value;
    const endTime = this.calendarForm.get('updateEndTime')?.value;

    const { startBeforeEnd, start, end } = this.formatTimeAndDate(
      date,
      startTime,
      endTime
    );

    if(startBeforeEnd){
      try {
        lastValueFrom(
          this.calendarService.updateCalendarEvent(klausurId, start, end)
        );
        this.loadCalendarEvents()
        this.isChangeOrDeleteOpen = false;

      } catch (error) {
        this.isInValid = true;
      } finally {
        this.fullcalendar.getApi().refetchEvents();
      }
    } else {
      this.isInValid = true;
    }
    }
    // Behandelt den Logout-Vorgang
    onLogOut(){
      this.authService.logout();
    }
}
