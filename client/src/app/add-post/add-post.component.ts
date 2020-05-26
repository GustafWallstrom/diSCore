import { Component, ViewChild, ElementRef } from '@angular/core';
import { AddPostService } from './add-post.service';
import { Post } from '../models/post.model';
import { Course } from '../models/course.model';
import { Router, convertToParamMap } from '@angular/router';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [ AddPostService ]
})
export class AddPostComponent {

  @ViewChild('closeBtn') closeBtn: ElementRef;
  public post : Post;
  public courses: any [];
  public value: String;
  public isThere: Boolean = false;

  constructor(private addPostService: AddPostService, private router: Router, private commonService: CommonService) {
  	this.post = new Post();
  }

  addPost() {
  	if(this.post.title && this.post.description && /^\d+$/.test(this.post.description)){
      if(this.isThere){
        this.addPostService.addPost(this.post).subscribe(res =>{
          this.closeBtn.nativeElement.click();
          this.commonService.notifyPostAddition();
        });
      } else{
        alert('The course is not in the database :(');
      }     
  	} else {
  		alert('Enter course and number of strokes!\nMake sure number of throws only contains digits.');
  	}
  }

  ngOnInit(){
    this.showCourses();
    this.courseExists()
  }

  fillTitle(name){
    //this.value = name;
    this.post.title = name;
  }

  courseExists(){

    this.addPostService.findCourse(this.post.title).subscribe(result => {      
        if(result['data']){
         this.isThere = true;
        } else {
          this.isThere = false;
        }
    }, error => {
      console.log('error is ', error);
    });
  }

  showCourses(){
    this.addPostService.showCourses().subscribe(result => {
    this.courses = result['data'];
    });
  }

}
