import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Task } from '../model/task/task.model';
import { Push } from '../model/push/push.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskListService {

    private taskListRef = this.db.list<Task>('tasks');
    private tokenListRef = this.db.list<Push>('tokens');

    public result: Observable<Push[]>

    constructor(private db: AngularFireDatabase) { }

    getTaskList() {
        return this.taskListRef;
    }

    addToken(token){
      this.result =  this.tokenListRef.snapshotChanges()
      .map(
      changes => {
         return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });

      this.result.subscribe((values) => {
          console.log(values);
          let found: boolean = false;
            for(let i = 0; i < values.length; i++) {
                if (values[i].pushtoken == token) {
                    found = true;
                    break;
                }
            }

            if(!found){
                console.log('The token is. ' +  token);
                let push : any = {pushtoken : token};
                this.tokenListRef.push(push);
            }
      });
    }

    addTask(task: Task) {
        return this.taskListRef.push(task);
    }

    updateTask(task: Task) {
        return this.taskListRef.update(task.key, task);
    }

    removeTask(task: Task) {
        return this.taskListRef.remove(task.key);
    }
}