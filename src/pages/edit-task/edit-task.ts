import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Task } from '../../model/task/task.model';
import { TaskListService } from '../../services/task-list.service';

@IonicPage()
@Component({
  selector: 'page-edit-task',
  templateUrl: 'edit-task.html',
})
export class EditTaskPage {

  task: Task = {
    title: '',
    content: ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private taskListService: TaskListService) {
  }

  ionViewDidLoad() {
    this.task = this.navParams.get('task');
  }

  updateTask(task: Task) {
    this.taskListService.updateTask(task).then(() => {
      this.navCtrl.setRoot('HomePage');
    })
  }

  // removeTask(task: Task) {
  //   this.taskListService.removeTask(task).then(() => {
  //     this.navCtrl.setRoot('HomePage');
  //   })
  // }
}
