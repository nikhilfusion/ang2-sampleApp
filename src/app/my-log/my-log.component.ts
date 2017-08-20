import { Component, OnInit} from '@angular/core';

import { DataService } from '../services/data.service';

import * as _ from 'underscore';
import * as moment from 'moment';

@Component({
  selector: 'app-my-log',
  templateUrl: './my-log.component.html',
  styleUrls: ['./my-log.component.css']
})

export class MyLogComponent implements OnInit {

	data: Data;
  keyList: string[];
  userData: Dt[];
  showDialog = false;
  filter = {
    loggedUseremail: '',
    displayTime: moment(new Date).format('YYYY-MM-DD'),
    email: '',
    time: moment(new Date).format('YYYY-MM-DD')
  };

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit() {

    this.getLogData();
  }

  getLogData() {
    this.dataService.getData()
    .subscribe((res) => {
      this.userData = res;
      var newArr = _.map(this.userData, function(element) {
        return _.extend(
          {}, 
          element, {
            date: moment(element['time'], 'DD-MM-YYYY').format('dddd, MMMM DD'),
            displayTime: moment(element['time'], 'DD-MM-YYYY hh:mm').format('h:mm A')
          });
      });
      this.data = _.groupBy(newArr, 'date');
      this.keyList = Object.keys(this.data);
      console.log(this.data);
      console.log(this.keyList);
    });
  }

  setFilter(filterDt) {
    this.showDialog = false;
    var filtered = _.filter(this.userData, function(item){ 
      return((filterDt.loggedUseremail ? item.loggedUseremail === filterDt.loggedUseremail : true) && (filterDt.displayTime ? moment(item.time).format('YYYY-DD-MM') === filterDt.displayTime : true));
    });
    console.log(filtered);
    if(filtered) {
      var newArr = _.map(filtered, function(element) {
        return _.extend(
          {}, 
          element, {
            date: moment(element['time'], 'DD-MM-YYYY').format('dddd, MMMM DD'),
            displayTime: moment(element['time'], 'DD-MM-YYYY hh:mm').format('h:mm A')
          });
      });
      this.data = _.groupBy(newArr, 'date');
    }
    this.keyList = Object.keys(this.data);
    this.filter.email = filterDt.loggedUseremail;
    this.filter.time = filterDt.displayTime;
  }

  openDialog() {
    this.showDialog = !this.showDialog;
  }


daterangepickerOptions = {
    startDate: '09/01/2017',
    endDate: '09/02/2017',
    format: 'DD/MM/YYYY'
  }


    /* multipl select code */

     multipleData = [];
     selectDisabled = true;

     userModel = {
         gender: "m",
         name: "John Doe"
     };
     selection: string = "";
     cities: Array<string> = ["New York", "Belgrade", "Stockholm", "Sarajevo"];

     onMultiple(data: Array<string>): void {
         this.multipleData = data;
     }
}

interface Data {
  [key: string]: Dt[]
}

interface Dt {
  id: number,
  className: string,
  loggedUseremail: string,
  methodName: string,
  time: string,
  date: string,
  displayTime: string
}
