import { Injectable } from '@angular/core';
import { Project } from "../models/project.model";
import { ProjectService } from "./project.service";
import { Observable } from "rxjs/Observable";
import { map } from 'rxjs/operators';

@Injectable()
export class ProjectListService {

  projects: Project[] = [];

  constructor(private projectService: ProjectService) { }

  getProjects(): Project[] {
    return this.projects;
  }

  loadProjects(): void {
    this.projectService.getProjects()
        .subscribe(projects => this.projects = projects);
  }

  addProject(project: Project): Observable<Project> {
    return this.projectService.addProject(project)
      .pipe(map((addedProject: Project) => this.addProjectToList(addedProject)));
  }

  addProjectToList(project: Project): Project {
    this.projects.push(project);
    return project;
  }

  updateProject(project: Project): Observable<Project> {
    return this.projectService.updateProject(project)
      .pipe(map((addedProject: Project) => this.updateProjectList(addedProject)));
  }

  updateProjectList(project: Project): Project {
    let foundProject = this.projects.find(p => p.id == project.id);
    Object.assign(foundProject, project);
    return project;
  }
}
