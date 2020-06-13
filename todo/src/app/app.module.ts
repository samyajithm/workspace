import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MaterialModule} from './modules/material.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidebarComponent} from './components/common/sidebar/sidebar.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TaskListComponent} from './components/main/task-list/task-list.component';
import {ConfirmDialogComponent} from './components/common/confirm-dialog/confirm-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatGridListModule} from "@angular/material/grid-list";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef} from "@angular/material/dialog";
import { TaskDetailsComponent } from './components/main/task-details/task-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TaskListComponent,
    ConfirmDialogComponent,
    TaskDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    DragDropModule,
    MatGridListModule
  ],
  entryComponents: [
    ConfirmDialogComponent,
    TaskDetailsComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MatDialogRef, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/');
}
