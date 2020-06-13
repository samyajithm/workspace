import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TaskListComponent} from "./components/main/task-list/task-list.component";


const routes: Routes = [
  {
    path: 'tasks',
    component: TaskListComponent,
    children: [{
      path: '',
      redirectTo: 'pending',
      pathMatch: 'prefix'
    }, {
      path: 'pending',
      component: TaskListComponent,
      data: {
        title: 'Tasks',
        state: 'pending',
        context: 'pending'
      }
    }, {
      path: 'important',
      component: TaskListComponent,
      data: {
        title: 'Important',
        state: 'pending',
        context: 'important'
      }
    }, {
      path: 'completed',
      component: TaskListComponent,
      data: {
        title: 'Completed',
        state: 'completed',
        context: 'completed'
      }
    }, {
      path: 'scheduled',
      component: TaskListComponent,
      data: {
        title: 'Scheduled',
        state: 'pending',
        context: 'scheduled'
      }
    }]
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'tasks'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
