import { Component, OnInit } from '@angular/core';
import {Sidebar} from "../../../types/tasks";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sidebar: Sidebar[];
  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.sidebar = [{
      link: '/tasks/pending',
      translateKey : 'sidebar.tasks',
      iconName: 'assignment'
    },{
      link: '/tasks/important',
      translateKey : 'sidebar.important',
      iconName: 'star_border'
    },{
      link: '/tasks/scheduled',
      translateKey : 'sidebar.scheduled',
      iconName: 'schedule'
    },{
      link: '/tasks/completed',
      translateKey : 'sidebar.completed',
      iconName: 'assignment_turned_in'
    }]
  }

}
