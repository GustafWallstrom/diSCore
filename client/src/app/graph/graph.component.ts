import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxChartModule, DxSelectBoxModule } from 'devextreme-angular';
import { MatchInfo, Course, Service } from './graph.service';

if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
    selector: 'demo-app',
    templateUrl: 'graph/graph.component.html',
    styleUrls: ['graph/graph.component.css'],
    providers: [Service],
    preserveWhitespaces: true
})
export class GraphComponent {
    types: string[] = ["line", "stackedline", "fullstackedline"];
    courseinfo: Course[];
    matchinfo: MatchInfo[];

    constructor(service: Service) {
        this.courseinfo = service.getCourseInfo();
        this.matchinfo = service.getMatchInfo();
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxChartModule,
        DxSelectBoxModule
    ],
    declarations: [GraphComponent],
    bootstrap: [GraphComponent]
})
export class GraphModule { }

platformBrowserDynamic().bootstrapModule(GraphModule);