import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CreateBusScheduleRequest } from 'src/app/models/bus';
import { DayOfWeek, Direction } from 'src/app/models/enums';

@Component({
  selector: 'app-bus-schedule-view',
  standalone: true,
  imports: [
    NgxMaterialTimepickerModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './bus-schedule-view.component.html',
  styles: ``,
})
export class BusScheduleViewComponent {
  @Input() scheduleModel: CreateBusScheduleRequest;
  @Input() index: number;
  @Output() delete = new EventEmitter<number>();

  dayOfWeekEnum = DayOfWeek;
  directionEnum = Direction;

  getWeekEnumKeys() {
    return Object.keys(this.dayOfWeekEnum).filter((k) => !isNaN(Number(k)));
  }

  getDirectionEnumKeys() {
    return Object.keys(this.directionEnum).filter((k) => !isNaN(Number(k)));
  }

  getWeekEnumValue(key: string) {
    return this.dayOfWeekEnum[key];
  }

  getDirectionEnumValue(key: string) {
    return this.directionEnum[key];
  }

  getKeyNum(key: string) {
    return Number(key);
  }

  deleteSchedule() {
    this.delete.emit(this.index);
  }
}
