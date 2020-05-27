import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';

@Injectable()
export class ShowPostService {

	constructor(private http: HttpClient){

	}
	
	loadPosts(user){
		return this.http.post('/api/post/getYourPost',{
			name: user
		})
	}
}