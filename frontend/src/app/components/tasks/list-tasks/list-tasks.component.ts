import { Component, Injectable, Input, OnInit, ViewChild, } from '@angular/core';
import { IPriorities, TaskModel} from './../../../models/task.model';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from 'src/app/services/task.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { MensajeConfirmacionComponent} from '@shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { TasksModule } from '../tasks.module';

@Injectable()
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  displayedColumns: string[] = ['id', 'nameTask', 'description', 'dueDate', 'priorityTask','status', 'acciones'];
  priority: IPriorities = {
    id: 1,
    namePriority: '',
  };

  tasks: TaskModel[] = [
    {id: 1, nameTask: 'Tarea 1', description:'Description 1', dueDate:new Date("2001,08,02"), priorityTask: this.priority, status: false},
    {id: 2, nameTask: 'Tarea 2', description:'Description 2', dueDate:new Date('2018-01-10'), priorityTask:this.priority, status: false},
    {id: 3, nameTask: 'Tarea 3', description:'Description 3', dueDate:new Date('2012-02-15'), priorityTask:this.priority, status: true},
    {id: 4, nameTask: 'Tarea 4', description:'Description 4', dueDate:new Date('2014-03-19'), priorityTask:this.priority, status: false},
    {id: 5, nameTask: 'Tarea 5', description:'Description 5', dueDate:new Date('2016-04-20'), priorityTask:this.priority, status: true},
    {id: 6, nameTask: 'Tarea 6', description:'Description 6', dueDate:new Date('2022-07-28'), priorityTask:this.priority, status: false},
    {id: 7, nameTask: 'Tarea 7', description:'Description 7', dueDate:new Date('2022-07-28'), priorityTask:this.priority, status: false},
    {id: 8, nameTask: 'Tarea 8', description:'Description 8', dueDate:new Date('2022-07-28'), priorityTask:this.priority, status: true},
    {id: 9, nameTask: 'Tarea 9', description:'Description 9', dueDate:new Date('2022-07-28'), priorityTask:this.priority, status: true},
    {id: 10, nameTask: 'Tarea 10', description:'Description 10', dueDate:new Date('2022-07-28'), priorityTask:this.priority, status: true},
    {id: 11, nameTask: 'Tarea 11', description:'Description 11', dueDate:new Date('2022-07-28'), priorityTask:this.priority, status: false},
    {id: 12, nameTask: 'Tarea 12', description:'Description 12', dueDate:new Date('2022-07-28'), priorityTask:this.priority, status: false},

    ];
  
  dataSource: MatTableDataSource<TaskModel> = new MatTableDataSource<TaskModel>(this.tasks);
  taskList!: TaskModel[];  

  idUrl: number = 0;
  dataSelected: any = {
    spaceId: 0,
    task: null
  }

  // spaceSelected: any = {
  //   nameSpace: "espacio",
  //   description: "descripcion del espacio"
  // }

  tasks$!: Observable<TaskModel[]>;
  hasValue = false;
  
  @Input() spaceIdHijo: number = 0;
  
  constructor(
    private taskService: TaskService, 
    private activatedRouter : ActivatedRoute,
    private dialog: MatDialog
    ) { }  
  

  ngOnInit(): void {
    this.idUrl = this.activatedRouter.snapshot.params['id'];
    console.log('ngOnInit-idUrl', this.idUrl);
    console.log('ngOnInit-spaceIdHijo', this.spaceIdHijo);
    // console.log('dataSource..', this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    this.idUrl = this.activatedRouter.snapshot.params['id'];
    //this.loadTasks();
   }

  ngOnChanges(){
    console.log("ngOnChanges...", this.spaceIdHijo);
    if (this.spaceIdHijo === undefined)
    {
      console.log("ngOnChanges.1..", this.spaceIdHijo);
      this.tasks.length=0; 
    }
    else{
      this.tasks$ = this.taskService.getTasks_azure(this.spaceIdHijo);
      this.tasks$.subscribe(
        (data) => {
          console.log('lista.x.', data);
          this.tasks = data;
          // this.tasks.description= ''
          this.dataSource = new MatTableDataSource<TaskModel>(this.tasks);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      });

    }

  } 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  
  
  openDialog(task: TaskModel): void {
    console.log('The openDialog', task);
    this. dataSelected.spaceId = this.spaceIdHijo
    this. dataSelected.task = task;

    const dialogRef = this.dialog.open(AddEditTaskComponent, {
      width: '350px',
      // data: {spaceId: this.spaceIdHijo, taskData: task},
      data: this.dataSelected

    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      console.log(result);
    }
    );
  }

  openDialogAdd(): void {
    // const task: TaskModel = {
    //   id: this.actionTypes === ActionTypes.ADD ? 0 : this.myForm.value.id,
    //     nameTask: this.myForm.value.nameTask,
    //     description: this.myForm.value.description,
    //   dueDate: this.myForm.value.dueDate, //new Date('2022-10-31'),
    //   priorityTask: this.myForm.value.priorityTask,
    //   status: this.actionTypes === ActionTypes.ADD ? '' : this.myForm.value.status
    //   };

    const tmptask: TaskModel = {
      id: 0,
      nameTask: '',
      description: '',
      dueDate: new Date("2023,07,31"),
      priorityTask: this.priority,
      status: false,
    };

    this.openDialog(tmptask);
   
  }  
 
  deleteTask(index: number) {
    console.log('deleteTask-id..', index);
    this.taskService.deleteTask(index).subscribe(
      () => {
        console.log('Objeto eliminado correctamente');
        window.location.reload()
      },
      (error) => {
        console.error('Error al eliminar el objeto', error);
        //window.location.reload()
      }
    );


  }  

}
