import { Injectable } from '@angular/core';
import { TaskModel } from './../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskList: TaskModel[] = [
    { name:'tarea 1', description:'Esta es la tarea 1' },
    { name:'tarea 2', description:'Esta es la tarea 2' }
    // { name:'tarea 1', description:'Esta es la tarea 1', expiredDate:new Date('2001-10-05') },
    // { name:'tarea 2', description:'Esta es la tarea 2', expiredDate: new Date('2010-07-22') }

  ] 

  constructor() { }

  getTasks() {
    return this.taskList.slice();
  }

  deleteTask(index: number) {
    this.taskList.splice(index, 1);
  }

  addTask(empleado: TaskModel) {
    this.taskList.unshift(empleado);
  }

  getTask(index: number) {
    return this.taskList[index];
  }

  editTask(task: TaskModel, idTask: number){
    this.taskList[idTask].name = task.name;
    this.taskList[idTask].description = task.description;
    // this.taskList[idTask].fechaIngreso = task.fechaIngreso;
    // this.taskList[idTask].sexo = task.sexo;
    // this.taskList[idTask].estadoCivil = task.estadoCivil;
  }


}
