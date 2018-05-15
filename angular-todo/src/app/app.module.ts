import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectService } from "./services/project.service";
import { ProjectComponent } from './components/projects/project/project.component';
import { ProjectListService } from "./services/project-list.service";
import { ProjectFormComponent } from './components/projects/project-form/project-form.component';
import { HttpClientModule } from "@angular/common/http";
import { ProjectModalComponent } from './components/projects/project-modal/project-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectComponent,
    ProjectFormComponent,
    ProjectModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule.forRoot(),
    HttpClientModule
  ],
  providers: [ProjectService, ProjectListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
