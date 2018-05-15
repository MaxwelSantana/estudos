import { Injectable } from '@angular/core';
import { Project } from "../models/project.model";
import { PROJECTS } from "../consts/mock-project";
import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient) { }

  projectURL = "http://localhost:3000/projects";

  getProjects(): Observable<Project[]> {
    return this.http.get(this.projectURL);
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post(this.projectURL, project);
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put(`${this.projectURL}/${project.id}`, project);
  }
}
