import { Component, OnInit, ElementRef} from '@angular/core';
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
  userData: any[];
  showDialog = false;
  selectedItem:any[];
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
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.dataService.getData()
    .subscribe((res) => {
      this.userData = res;
      var queryParams = this.route.snapshot.queryParams;
      _.each(queryParams, (val, key) => {
        this.filter[key] = this.filteredDt[key] = val;
      })
      this.setFilter(queryParams);
      this.selectedItem = this.selectedItem ||  this.route.snapshot.queryParams.email;

    })
  };
  generateFilter(filterDt) {
    var afterFilter={};
    for (let key in filterDt) {
      if (filterDt[key]) {
        afterFilter[key] = this.filteredDt[key] = filterDt[key];
      }
    }
    this.router.navigate(['/'],{ queryParams: afterFilter});
    this.showDialog = false;
    this.setFilter(afterFilter);
  }

  setFilter(filterDt) {
    var filteredInfo = this.userData.filter(function(item) {
      var splitDate: string[] = moment(item.time).format('YYYY-MM-DD').split('-'),
        splitDt = new Date(Number(splitDate[0]), Number(splitDate[2]), Number(splitDate[1])),
        startDate = filterDt.startDate ? new Date(filterDt.startDate.split('-')[0], filterDt.startDate.split('-')[1], filterDt.startDate.split('-')[2]) : '',
        endDate = filterDt.endDate ? new Date(filterDt.endDate.split('-')[0],filterDt.endDate.split('-')[1], filterDt.endDate.split('-')[2]) : '';
        if(filterDt.email instanceof Array) {
          if(!filterDt.email.includes(item.loggedUseremail)) {
            return false;
          }
        } else {
          if(filterDt.email != item.loggedUseremail) {
            return false;
          }
        }
        if(startDate && startDate > splitDt) {
           return false;
        }
        if(endDate && endDate < splitDt) {
          return false;
        }
        return true;
    });
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