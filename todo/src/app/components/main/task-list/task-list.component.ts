import {Component, DoCheck, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DialogData, List, Tasks} from "../../../types/tasks";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {FormControl} from "@angular/forms";
import {TodoService} from "../../../services/todo.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../common/confirm-dialog/confirm-dialog.component";
import {TaskDetailsComponent} from "../task-details/task-details.component";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, DoCheck {

  title: string = 'Tasks';
  context: string = ''
  state: string = 'pending'
  newTaskInput = new FormControl('');
  tasks: Tasks;

  constructor(public activatedRoute: ActivatedRoute,
              public todoService: TodoService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    if (this.todoService.getLocalStorage('tasks')) {
      this.tasks = this.todoService.getLocalStorage('tasks');
    } else {
      this.tasks = {
        pending: [],
        completed: []
      }
    }
  }

  ngDoCheck(): void {
    if (this.context != this.activatedRoute.snapshot.firstChild.data['context']) {
      this.ngOnInit();
      this.title = this.activatedRoute.snapshot.firstChild.data['title'];
      this.context = this.activatedRoute.snapshot.firstChild.data['context'];
      this.state = this.activatedRoute.snapshot.firstChild.data['state'];
      this.updateHideItem();
    }
  }

  updateHideItem() {
    let condition: string;
    switch (this.context) {
      case 'pending':
        condition = 'false';
        break;
      case 'important':
        condition = '!item.important';
        break;
      case 'scheduled':
        condition = '!item.dueBy'
        break;
      case 'completed':
        condition = 'false';
        break;
      default:
        condition = 'true';
        break;
    }

    this.tasks[this.state].forEach(item => {
      item.hideItem = eval(condition);
    })
  }


  addNewTask() {
    if (this.newTaskInput.value && this.newTaskInput.value.trim() != '') {
      let item: List = {
        name: this.newTaskInput.value,
        index: this.tasks.pending.length,
        hideItem: false,
        createdOn: new Date(),
        completed: false
      }
      this.tasks.pending.push(item);
      this.newTaskInput.patchValue('')
      if (this.context == 'important') {
        this.markAsImportant(item, this.state, true)
      }
    }
    this.todoService.setLocalStorage('tasks', this.tasks);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks.pending, event.previousIndex, event.currentIndex);
    this.updateIndex(this.tasks.pending);
    this.todoService.setLocalStorage('tasks', this.tasks);
  }

  updateIndex(list: List[]) {
    if (list && list.length > 0) {
      list.forEach((item, index) => {
        item.index = index;
      })
    }
  }

  deleteTask(item: List, state: string) {
    const data: DialogData = {
      title: 'Delete',
      content: `Are you sure you want to permanently delete <b>${item.name} </b>?`,
      confirmButton: 'Delete',
      cancelButton: 'Cancel'
    }
    this.openConfirmDialog(data, () => {
      this.tasks[state].splice(Number(item.index), 1);
      this.updateIndex(this.tasks[state]);
      this.todoService.setLocalStorage('tasks', this.tasks);
    });
  }

  markAsImportant(item: List, state: string, important: boolean) {
    this.tasks[state][item.index].important = important;
    this.todoService.setLocalStorage('tasks', this.tasks);
    if (this.context == 'important') {
      this.updateHideItem()
    }
  }

  moveTask(item: List, state: boolean) {
    if (state) {
      item.completed = true;
      // const currentDate = new Date().toString()
      // item.completedOn = currentDate.slice(0, currentDate.indexOf(' GMT'));
      item.completedOn = new Date();
      this.tasks.completed.push(item);
      this.tasks.pending.splice(Number(item.index), 1);
    } else {
      item.completed = false;
      delete item.completedOn;
      this.tasks.pending.push(item);
      this.tasks.completed.splice(Number(item.index), 1);
    }

    this.updateIndex(this.tasks.pending);
    this.updateIndex(this.tasks.completed);
    this.todoService.setLocalStorage('tasks', this.tasks);
  }

  checkTotalRecord(taskList: List[]) {
    if (taskList && taskList.length > 0) {
      const filteredList: List[] = taskList.filter(item => {
        return !item.hideItem
      });
      return !filteredList || (filteredList && filteredList.length <= 0);
    } else {
      return true;
    }
  }

  checkOverDue(date) {
    return new Date(date) < new Date();
  }

  openConfirmDialog(data, successCallback, errorCallback?) {
    let confirmDialog = this.dialog.open(ConfirmDialogComponent, <MatDialogConfig>{
      panelClass: 'confirm-dialog',
      disableClose: true,
      hasBackdrop: true,
      data: data
    })

    confirmDialog.afterClosed().subscribe(response => {
      if (response) {
        successCallback();
      }
    })
  }

  editTask(item: List) {
    let data: DialogData = {
      title: 'Task Details',
      cancelButton: 'Cancel',
      taskItem: item
    }

    if (this.context == 'completed') {
      data.isFieldDisabled = true;
    } else {
      data.isFieldDisabled = false;
      data.confirmButton = 'Update';
    }

    let editDialog = this.dialog.open(TaskDetailsComponent, <MatDialogConfig>{
      panelClass: 'details-dialog',
      disableClose: true,
      hasBackdrop: true,
      data: data
    })

    editDialog.afterClosed().subscribe((response: DialogData) => {
      if (response) {
        this.tasks['pending'][item.index] = response.taskItem;
        this.updateHideItem()
        if(response.taskItem.completed) {
          this.moveTask(this.tasks['pending'][item.index], true)
        } else {
          this.todoService.setLocalStorage('tasks', this.tasks);
        }
      }
    });
  }
}
