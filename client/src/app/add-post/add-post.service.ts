import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';

@Injectable()
export class AddPostService {

	constructor(private http: HttpClient){

	}
	
	addPost(post: Post){

		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		var todayString = String(dd + '-' + mm + '-' + yyyy);
		var currUser = localStorage.getItem('currentUser');

		return this.http.post('/api/post/createPost',{
			name : currUser,
			title : post.title,
			description : post.description,
			date: todayString
		})
	}

}