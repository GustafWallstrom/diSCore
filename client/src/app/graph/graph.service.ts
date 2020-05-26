import { Injectable } from '@angular/core';

export class MatchInfo {
    coursename: string;
    result: number;
}

export class Course {
    name: string;
}

let courseInfo: Course[] = [
    { name: 'Folkparken' }
];

let matchInfo: MatchInfo[]  = [
    { coursename: 'Folkparken', result: 56}
];

@Injectable()
export class Service {
    getCourseInfo(): Course[] {
        return courseInfo;
    }
    getMatchInfo(): MatchInfo[] {
        return matchinfo;
    }
}
