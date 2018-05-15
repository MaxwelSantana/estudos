import { Component, OnInit, Input } from '@angular/core';
import { Project } from "../../../models/project.model";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {

  @Input() project: Project;

  @Input() newProject: boolean;

  constructor() { }

  ngOnInit() {
  }

}
