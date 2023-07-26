import { Component, Inject } from '@angular/core';
import { IPriorities, TaskModel} from './../../../models/task.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActionTypes } from '@shared/action-types.enum';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';	
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common'


interface DTOPutTask {
	nameTask: string;
  }

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss'],
})
export class AddEditTaskComponent {

	apiUrl: string = "https://ninja-app-v1-api.azure-api.net/";	

	actionTypes: ActionTypes | undefined;
	id_Index: number;
	isVisible = true;
	myForm: FormGroup;  

  spaceId: number = 0;	
  dataSelected: any = {
    spaceId: 0,
    task: null
  };
  
  newTask: DTOPutTask = {
    nameTask: `task`
  }
  
  priority: IPriorities = {
    id: 1,
    namePriority: 'Bajo',
  };

  users = [
    {name: 'Percy'},
    {name: 'David'},
    {name: 'Gonzalo'},
    {name: 'Gary'},
    {name: 'Javier'},
    {name: 'Agustin'}    
  ]

  actionTitle: string = 'Agregar Tarea';

constructor(
		private httpClient: HttpClient,
		private fb: FormBuilder,
		private taskService: TaskService,
		private router: Router,
		private aRoute: ActivatedRoute,
		public snackBar: MatSnackBar,	
		private dialogRef: MatDialogRef<AddEditTaskComponent>,
		public datepipe: DatePipe,
		@Inject(MAT_DIALOG_DATA) public data: any
  ){
	console.log('data..', data)
	this.dataSelected = data;
    this.myForm = new FormGroup({
		id: new FormControl(data.task.id),
		nameTask: new FormControl(data.task.nameTask),
		description: new FormControl(data.task.description),
		dueDate: new FormControl(data.task.dueDate),
		priorityTask: new FormControl(data.task.priorityTask),
		status: new FormControl(data.task.status),
		
    });

	this.actionTypes = data.task.id === 0 ? ActionTypes.ADD : ActionTypes.EDIT;
	this.actionTitle = data.task.id === 0 ? 'Agregar Tarea' : 'Editar Tarea';

	const idParam = 'id';
	this.id_Index = this.aRoute.snapshot.params[idParam];
	console.log('actionTypes', this.actionTypes);
	console.log('actionTitle', this.actionTitle)

  }

ngOnInit(): void {
		this.isVisible = this.actionTypes === ActionTypes.EDIT;
	}


onCancelDialog(): void {
		this.dialogRef.close();
	  }

	  priorityGroup = 0;
	  priorityValue = 0;
	  onPriorityChange() {
		this.priorityValue= this.priorityGroup;
		console.log('priorityValue', this.priorityValue)
	  }	
	  
	  statusGroup = false;
	  statusValue = false;
	  onStatusChange() {
		this.statusValue= this.statusGroup;
		console.log('statusValue', this.statusValue)
	  }		  

SaveTask() {
	const task: any = {
	  id: this.actionTypes === ActionTypes.ADD ? 0 : this.myForm.value.id,
      nameTask: this.myForm.value.nameTask,
      description: this.myForm.value.description,
	  dueDate: this.datepipe.transform(this.myForm.value.dueDate, 'dd/MM/yyyy'),
	  priorityTask: this.priorityValue, //this.priority, // this.myForm.value.priorityTask,
	  status: this.statusValue //this.actionTypes === ActionTypes.ADD ? false : true //this.myForm.value.status
    };
	console.log('SaveTask', this.actionTypes);
	console.log('this.myForm.value.priorityTask', this.myForm.value.priorityTask);


	switch (this.actionTypes) {
		case ActionTypes.ADD:
				// this.addTask(task);
				this.createTask();
			break;
		case ActionTypes.EDIT:
			this.editTask(task);
		break;
	}
	this.dialogRef.close();
}

createTask(){
		this.newTask.nameTask = this.myForm.value.nameTask;
 
        this.addTaskNew(this.newTask).subscribe({
			error: error => {
			  console.error('Error al crear el objeto****', error);
			  if (error.status===200) {
				console.log('La tarea ha sido creada con exito.');
				this.snackBar.open('La tarea ha sido creada con exito!!!', 'Completado', {
					duration: 4000, verticalPosition: "top", horizontalPosition: "end" 
				  }); 
			  }
			},
			complete: () => {
			  console.log('La tarea ha sido creada con exito.');
			  this.snackBar.open('La tarea ha sido creada con exito!!!', 'Completado', {
				duration: 4000, verticalPosition: "top", horizontalPosition: "end" 
			  }); 
			},
		  });		
		}
		 

addTaskNew(dTOAddTask:any): Observable<any>{
		let url = this.apiUrl + `task?spaceId=${this.dataSelected.spaceId}`;
		console.log('createTask-addTask', dTOAddTask);
		console.log('createTask-url', url);
		return this.httpClient.post<any>(url, dTOAddTask);
	}

addTask(task: TaskModel) {
		console.log('add-edit/addTask', task.nameTask);
		console.log('add-edit/spaceId', this.dataSelected.spaceId);
		// this.taskService.addTask(task.nameTask,  this.dataSelected.spaceId);
		this.taskService.addTask(task.nameTask,  this.dataSelected.spaceId) 
			.subscribe((data) => {
				console.log('Objeto creado correctamente');
		   		window.location.reload();		
			}),
			// (error) => {
			// 	console.error('Error al crear el objeto', error);
			// })};
			
			this.snackBar.open('La tarea ha sido creada con exito!!!', 'Completado', {
				duration: 4000, verticalPosition: "top", horizontalPosition: "end" 
			  }); 
	}

editTask(task: any) {
		console.log('add-edit/editTask', task);
		this.editTaskNew(task.id, task).subscribe({

			error: error => {
				console.error('Error al editar el objeto****', error);
				if (error.status===200) {
				  console.log('La tarea ha sido editada con exito.');
				  this.snackBar.open('La tarea ha sido editada con exito!!!', 'Completado', {
					duration: 4000, verticalPosition: "top", horizontalPosition: "end" 
				  });
				}
			  },
			  complete: () => {
				console.log('La tarea ha sido editada con exito.');
				this.snackBar.open('La tarea ha sido editada con exito!!!', 'Completado', {
				  duration: 4000, verticalPosition: "top", horizontalPosition: "end" 
				}); 
			  },			  			

		})
	}
	
	editTaskNew(id: number, dTOPutSpace:TaskModel): Observable<any>{
		let url = this.apiUrl + `task?id=${id}`;		
		console.log('editTaskNew-addTask', dTOPutSpace);
		console.log('editTaskNew-url', url);

		return this.httpClient.put(url, dTOPutSpace)
	  }

}
