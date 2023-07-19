import { Component, Input, OnInit } from '@angular/core';
import { TaskModel} from './../../../models/task.model';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from 'src/app/services/task.service';
// import {MatTableModule} from '@angular/material/table';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

const ELEMENT_DATA: TaskModel[] = [
  {id: 1, name: 'Tarea 1', description:'Description 1', expiredDate:new Date("2001,08,02"), priority:1, status:'In Progress'},
  {id: 2, name: 'Tarea 2', description:'Description 2', expiredDate:new Date('2018-01-10'), priority:2, status:'Completado'},
];
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
  // standalone: true,
  // imports: [MatTableModule],  
})
export class ListTasksComponent implements OnInit {

  // displayedColumns: string[] = ['name', 'description', 'status', 'actions'];
  //dataSource = new MatTableDataSource<TaskModel>();
  // dataSource: MatTableDataSource<TaskModel> = new MatTableDataSource<TaskModel>();
  
  displayedColumns: string[] = ['id', 'demo-name', 'demo-description', 'expdate', 'priority','status'];
  dataSource = ELEMENT_DATA;
  taskList!: TaskModel[];  

  idUrl: number = 0;

  tasks$!: Observable<TaskModel[]>;

  @Input() spaceIdHijo: number = 4;
  spaceId: number = 4;

  // constructor(private empleadoService: EmpleadoService, public dialog: MatDialog,
  //   public snackBar: MatSnackBar) { }

  constructor(
    private taskService: TaskService, 
    private activatedRouter : ActivatedRoute
    ) { }  
  

  ngOnInit(): void {
    console.log('spaceIdHijo', this.spaceIdHijo);
    console.log('dataSource..', this.dataSource);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.idUrl = this.activatedRouter.snapshot.params['id'];
    this.loadTasks();
   }

  //  ngDoCheck(): {
  //   // console.log();
  //  }   

  loadTasks1() {
    // this.dataSource = this.taskService.getTasks();
    // console.log('lista..', this.taskList);
    // // this.dataSource = new MatTableDataSource<TaskModel>(this.taskList);
    console.log('lista1..', this.dataSource);

    // //this.dataSource = new MatTableDataSource(this.listEmpleado);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  } 
  loadTasks() {

    this.tasks$ = this.taskService.getTasks();
    this.tasks$.subscribe((xxx) => {
      console.log('lista.x.', xxx);
      this.dataSource = xxx;
    }

    )
    // this.taskService.getTasks().subscribe()
    //     data =>{
    //     this.dataSource = data;
    //   }
  
    console.log('lista1..', this.dataSource);

    // //this.dataSource = new MatTableDataSource(this.listEmpleado);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }    
}
