import { Component, OnInit } from '@angular/core';
import { ShowPostService } from './show-post.service';
import { Post } from '../models/post.model';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css'],
  providers: [ ShowPostService ]
})
export class ShowPostComponent implements OnInit {

  public posts : any [];

  constructor(private showPostService: ShowPostService, private commonService: CommonService) {
  	
  }

  hasPosts(){
    if(this.posts){
      for (let index = 0; index < this.posts.length; index++) {
        const element = this.posts[index].name;
        if(element == this.getCurrUser()) return true;
      }
      
    return false;
    }
  }

  getCurrUser(){
    return localStorage.getItem('currentUser');
  }

  ngOnInit(){
    this.getAllPost();

    this.commonService.postAdded_Observable.subscribe(res => {
      this.getAllPost();
    });
  }

  getAllPost(){
  	this.showPostService.getAllPost().subscribe(result => {
      this.posts = result['data'];
  	});
  }

}
