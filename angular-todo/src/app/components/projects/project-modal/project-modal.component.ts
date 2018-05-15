import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap/modal";
import { ProjectFormComponent } from "../project-form/project-form.component";
import { Project } from "../../../models/project.model";

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html'
})
export class ProjectModalComponent implements OnInit {

  @ViewChild('projectModal')
  projectModal: ModalDirective;
  
  @ViewChild('projectForm')
  projectForm: ProjectFormComponent;

  project: Project = new Project();;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.projectForm.AddedProjectCallback = this.AddAndUpdateProjectCallback.bind(this);
    this.projectForm.UpdatedProjectCallback = this.AddAndUpdateProjectCallback.bind(this);
    this.projectForm.CancelProjectInterationCallback = this.AddAndUpdateProjectCallback.bind(this);
  }

  addProject(): void {
    this.projectModal.show();
  }

  editProject(project: Project): void {
    Object.assign(this.project, project);
    this.projectModal.show();
  }

  AddAndUpdateProjectCallback(project: Project) {
    this.projectModal.hide();
    this.project = new Project();
  }

}
