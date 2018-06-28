import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Observable } from 'rxjs/Observable';
import { Task } from '../../model/task/task.model';
import { TaskListService } from '../../services/task-list.service';
import 'rxjs/add/operator/map';
import { Device } from '@ionic-native/device';
import { Firebase } from '@ionic-native/firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  taskList: Observable<Task[]>

  constructor(public navCtrl: NavController, private taskListService: TaskListService, private device: Device, private firebase: Firebase) {
    this.firebase.getToken()
  .then(token =>  this.taskListService.addToken(token)) // save the token server-side and use it to push notifications to this device
  .catch(error => console.error('Error getting token', error));

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
