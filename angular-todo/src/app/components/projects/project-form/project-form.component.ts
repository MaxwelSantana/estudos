import { Component, OnInit, Input } from '@angular/core';
import { ProjectListService } from "../../../services/project-list.service";
import { Project } from "../../../models/project.model";

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html'
})
export class ProjectFormComponent implements OnInit {

  @Input() project: Project;

  public AddedProjectCallback: (project: Project) => void;
  public UpdatedProjectCallback: (project: Project) => void;

  public CancelProjectInterationCallback: (project: Project) => void;

  constructor(private projectListService: ProjectListService) { }

  ngOnInit() {
  }

  isEditMode(): boolean {
    return this.project && this.project.id ? true : false ;
  }

  onSubmit(): void {
    if(this.isEditMode()){
      this.updateProject(this.project);
    }else {
      this.addProject(this.project);
    }
  }

  addProject(newProject: Project) {
    this.projectListService.addProject(newProject)
        .subscribe(addedProject => this.addedProjectSuccess(addedProject));
  }

  addedProjectSuccess(project: Project): void {
    if(this.AddedProjectCallback)
      this.AddedProjectCallback(project);
  }

  updateProject(newProject: Project) {
    this.projectListService.updateProject(newProject)
        .subscribe(addedProject => this.updatedProjectSuccess(addedProject));
  }

  updatedProjectSuccess(project: Project): void {
    if(this.UpdatedProjectCallback)
      this.UpdatedProjectCallback(project);
  }

  cancelProjectInteration(): void {
    if(this.CancelProjectInterationCallback)
      this.CancelProjectInterationCallback(null);
  }
}
