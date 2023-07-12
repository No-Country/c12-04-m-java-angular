import { Component, OnInit } from '@angular/core';
import { TaskModel} from './../../../models/task.model';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {

  // displayedColumns: string[] = ['name', 'description', 'status', 'actions'];
  displayedColumns: string[] = ['name', 'description'];
  //dataSource = new MatTableDataSource<TaskModel>();
  dataSource: MatTableDataSource<TaskModel> = new MatTableDataSource<TaskModel>();
  taskList!: TaskModel[];  

  // constructor(private empleadoService: EmpleadoService, public dialog: MatDialog,
  //   public snackBar: MatSnackBar) { }

  constructor(private taskService: TaskService
    ) { }  

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.loadTasks();

   }

  loadTasks() {
    this.taskList = this.taskService.getTasks();
    console.log('lista..', this.taskList);
    this.dataSource = new MatTableDataSource<TaskModel>(this.taskList);
    console.log('lista1..', this.dataSource);

    // //this.dataSource = new MatTableDataSource(this.listEmpleado);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }  
}
