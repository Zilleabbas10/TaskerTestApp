import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Task } from '../../model/task/task.model';
import { TaskListService } from '../../services/task-list.service';

@IonicPage()
@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html',
})
export class AddTaskPage {

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
    console.log('ionViewDidLoad AddNotePage');
  }

  addTask(task: Task) {
    this.taskListService.addTask(task).then(ref => {
      this.navCtrl.setRoot('HomePage');
    })
  }

}
