import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private taskListService: TaskListService, private device: Device, private firebase: Firebase) {
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




  deleteTask(task, name) {

    console.log(task);
    console.log(name);
    let confirm = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete Task ?? <br><strong>Name:</strong>&nbsp;' + name + '&nbsp;',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.confirmDeleteTask(task);
          }
        }
      ]
    });
    confirm.present();
  }


  confirmDeleteTask(task: Task){
    this.taskListService.removeTask(task).then(() => {
      console.log("Task Deleted");
    })
  }

}
