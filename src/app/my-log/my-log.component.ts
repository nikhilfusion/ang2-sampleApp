import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    email: [],
    startDate: '',
    endDate: ''
  };
  filteredDt = {
    email: '',
    startDate: '',
    endDate: ''
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataService.getData()
    .subscribe((res) => {
      this.userData = res;
      var queryParams = this.route.snapshot.queryParams;
      console.log('queryParams is ', queryParams);
      _.each(queryParams, (val, key) => {
        this.filter[key] = this.filteredDt[key] = val;
      })
      this.setFilter(queryParams);
    })
  };

  // var newArr = _.map(this.userData, function(element) {
  //   return _.extend(
  //     {}, 
  //     element, {
  //       date: moment(element['time'], 'DD-MM-YYYY').format('dddd, MMMM DD'),
  //       displayTime: moment(element['time'], 'DD-MM-YYYY hh:mm').format('h:mm A')
  //     });
  // });
  // this.data = _.groupBy(newArr, 'date');
  // this.keyList = Object.keys(this.data);

  generateFilter(filterDt) {
    var afterFilter={};
    for (let key in filterDt) {
      if (filterDt[key]) {
        afterFilter[key] = filterDt[key];
      }
    }
    this.router.navigate(['/'],{ queryParams: afterFilter});
    this.showDialog = false;
    this.setFilter(afterFilter);
  }

  setFilter(filterDt) {
    console.log(filterDt, this.userData);
    var filteredInfo = _.filter(this.userData, function(item){
      var splitDate: string[] = moment(item.time).format('YYYY-MM-DD').split('-'),
      splitDt = new Date(Number(splitDate[0]), Number(splitDate[1]), Number(splitDate[2])),
      startDate = filterDt.startDate ? new Date(filterDt.startDate.split('-')[0], filterDt.startDate.split('-')[1], filterDt.startDate.split('-')[2]) : '',
      endDate = filterDt.endDate ? new Date(filterDt.endDate.split('-')[0],filterDt.endDate.split('-')[1], filterDt.endDate.split('-')[2]) : '';
      console.log('splitDt is ', splitDt);
      console.log('start date is', startDate);
      console.log('end date is ', endDate);
      return(
        filterDt.email ? item.loggedUseremail.includes(filterDt.email) : '' &&
        filterDt.startDate ? startDate <= splitDt: '' &&
        filterDt.endDate ? endDate >= splitDt: ''
      );
    });
    console.log('filteredInfo is ', filteredInfo);
    if(filteredInfo) {
      var newArr = _.map(filteredInfo, function(element) {
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
  }

  openDialog() {
    this.showDialog = !this.showDialog;
  }

  onMultiple(data: Array<string>): void {
    this.filter.email = data;
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