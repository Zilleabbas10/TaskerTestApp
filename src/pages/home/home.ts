import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Observable } from 'rxjs/Observable';
import { Task } from '../../model/task/task.model';
import { TaskListService } from '../../services/task-list.service';
import 'rxjs/add/operator/map';
import { Device } from '@ionic-native/device';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  taskList: Observable<Task[]>

  constructor(public navCtrl: NavController, private taskListService: TaskListService, private device: Device) {
  console.log('Device UUID is: ' + this.device.uuid);
    this.taskList = this.taskListService.getTaskList()
      .snapshotChanges()
      .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });
  }
}
