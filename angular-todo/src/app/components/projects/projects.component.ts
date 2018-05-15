import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from "../../models/project.model";
import { ProjectListService } from "../../services/project-list.service";
import { ProjectModalComponent } from "./project-modal/project-modal.component";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

  @ViewChild('projectModal')
  projectModal: ProjectModalComponent;

  constructor(private projectListService: ProjectListService) { }

  ngOnInit() {
    this.projectListService.loadProjects();
  }

  get projects(): Project[] {
    return this.projectListService.getProjects();
  }

  addProject(): void {
    this.projectModal.addProject();
  }

  editProject(project: Project): void {
    this.projectModal.editProject(project);
  }
}
