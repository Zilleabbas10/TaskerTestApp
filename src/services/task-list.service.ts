import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Task } from '../model/task/task.model';

@Injectable()
export class TaskListService {

    private taskListRef = this.db.list<Task>('task-list');

    constructor(private db: AngularFireDatabase) { }

    getTaskList() {
        return this.taskListRef;
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