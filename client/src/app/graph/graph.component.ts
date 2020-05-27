import { Component, OnInit} from '@angular/core';
import { ShowPostService } from './graph.service';
import { Post } from '../models/post.model';
import { CommonService } from '../service/common.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  providers: [ ShowPostService ]
})

export class GraphComponent implements OnInit {

  public post: any[];
  result: any[] = [];
  dataSource: Object;
  chartConfig: Object;
  currentUser: String = localStorage.getItem('currentUser');

  constructor(private showPostService: ShowPostService, private commonService: CommonService, private http: HttpClient) { 
    this.chartConfig = {
      width: '100%',
      height: '300',
      type: 'line',
      dataFormat: 'json',
    };
  
    this.dataSource = {
      "chart": {
        "subCaption": "+/- from score-par",
        "xAxisName": "Date",
        "yAxisName": "Score",
        "theme": "fusion",
        "paletteColors": "#850505"
      },
      "data": this.result
    };

  }

  ngOnInit() {

    this.loadPosts();
    
    this.commonService.postAdded_Observable.subscribe(res => {
      this.loadPosts();
    });

  }

  loadPosts(){

    this.showPostService.loadPosts(this.currentUser).subscribe(result => {

      this.result.length = 0;
      for (let index = 0; index < result['data'].length; index++) {
        this.result.push({"label": result['data'][index].date, "value":result['data'][index].par});
      }
    });    
    
  }
}
