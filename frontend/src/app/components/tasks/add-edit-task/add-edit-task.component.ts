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
	actionBtn: string = "Editar";
	id_Index: number;
	isVisible = true;
	myForm: FormGroup;  

  spaceId: number = 0;
  taskId: number = 0;	
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
  ];

  priorities1: any[] = [
	{id: '1', name: 'Baja'},
	{id: '2', name: 'Media'},
	{id: '3', name: 'Alta'}
  ];  
  
  priorities: any[] = ['Baja', 'Media', 'Alta'];

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
	let pid = 
    this.myForm = new FormGroup({
		id: new FormControl(data.task.id),
		nameTask: new FormControl(data.task.nameTask, [Validators.required, Validators.maxLength(10)]),
		description: new FormControl(data.task.description, [Validators.required, Validators.maxLength(20)]),
		dueDate: new FormControl(data.task.dueDate, [Validators.required]),
		priorityTask: new FormControl(data.task.priorityTask, [Validators.required]),
		status: new FormControl(data.task.status, [Validators.required]),
		
    });
	// this.myForm.setValue(data.task.priorityTask.id);
	// this.myForm.get('priorityTask').setValue(data.task.priorityTask.id);

	var whiteSpace = "  ";
	this.actionTypes = data.task.id === 0 ? ActionTypes.ADD : ActionTypes.EDIT;
	this.actionTitle = data.task.id === 0 ? 'Agregar Tarea': 'Editar Tarea' + whiteSpace + 'Id:' +data.task.id;
	this.actionBtn = data.task.id === 0 ? 'Agregar': 'Editar';
	

	const idParam = 'id';
	this.id_Index = this.aRoute.snapshot.params[idParam];
	console.log('actionTypes', this.actionTypes);
	console.log('actionTitle', this.actionTitle)

  }

  setValueUpdate(priorityTaskId: number): void {
    this.myForm.get('priorityTask')?.setValue(priorityTaskId);
  }  

ngOnInit(): void {
		this.isVisible = this.actionTypes === ActionTypes.EDIT;
		if (this.actionTypes === ActionTypes.EDIT)
		{
			console.log('patchValue', this.data);
			let today = new Date();
			console.log('A:',today);
			// today = new Date(this.data.task.dueDate);
			let date_string = this.data.task.dueDate; // Apr 03 2020
			let parts_of_date = date_string.split("/");
			today = new Date(+parts_of_date[2], parts_of_date[1] - 1, +parts_of_date[0]);
			

			this.myForm.patchValue({
				id: this.data.task.id,
				nameTask: this.data.task.nameTask,
				description: this.data.task.description,
				dueDate: today,
				//XXXdueDate: new Date(this.data.task.dueDate),
				//dueDate: this.datepipe.transform(this.data.task.dueDate, 'dd/MM/yyyy'),
				// dueDate: new Date(), //this.data.task.dueDate,
				//dueDate: '22/07/1956',
				//priorityTask: "2", 
				priorityTask: this.data.task.priorityTask.id.toString(),
				status: this.data.task.status,				
			});
			// this.myForm.setValue(this.data.task.priorityTask.id);
			// this.myForm.get('priorityTask')?.setValue(this.data.task.priorityTask.id)
			console.log('patch-dueDate1:', this.myForm.get('dueDate'));
			console.log('patch-dueDate2:', this.myForm.controls['dueDate']);
		}

	}

priorityGroup = 0;
priorityValue = 0;
// prioritySelected = this.data.task.priorityTask.id;

onPriorityChange() {
	this.priorityValue= this.priorityGroup;
	console.log('priorityValue', this.priorityValue)
}
onPriorityChange1(event: { source: { id: string; }; value: string; }) {
	this.priorityValue= this.priorityGroup;
	console.log('priorityValue', this.priorityValue)
    console.log("event.source=" + event.source.id);
    console.log("event.value=" + event.value);	
}	
	
statusGroup = false;
statusValue = false;
onStatusChange() {
	this.statusValue= this.statusGroup;
	console.log('statusValue', this.statusValue)
}		

onCancelDialog(): void {
		this.dialogRef.close();
	  }


GuardarTask() {
	const task: any = {
	  id: this.actionTypes === ActionTypes.ADD ? 0 : this.myForm.value.id,
      nameTask: this.myForm.value.nameTask,
      description: this.myForm.value.description,
	  dueDate: this.datepipe.transform(this.myForm.value.dueDate, 'dd/MM/yyyy'),
	  // dueDate: this.myForm.get('dueDate')?.value,
	  // priorityTask: this.priorityValue, //this.priority, // this.myForm.value.priorityTask,
	  priorityTask: this.myForm.value.priorityTask,
	  status: this.statusValue
    };
	console.log('SaveTask', this.actionTypes);
	console.log('this.myForm.value.priorityTask', this.myForm.value.priorityTask);
	console.log('this.myForm.value.priorityTask5', this.myForm.value.dueDate);
	console.log('this.myForm.value.priorityTask6', task.dueDate);

	switch (this.actionTypes) {
		case ActionTypes.ADD:
				// this.addTask(task);
				this.createTask();
			break;
		case ActionTypes.EDIT:
			//this. esEditar(task);
			this.editTask(task);
		break;
	}
	// this.dialogRef.close();
}

esEditar(task: any) {
    console.log(task);
    this.myForm.patchValue({
      nameTask: task.nameTask,
      description: task.description,
	  dueDate: task.dueDate, //this.datepipe.transform(this.myForm.value.dueDate, 'dd/MM/yyyy'),
	 // dueDate: this.datepipe.transform(task.dueDate, 'dd/MM/yyyy'),
	 // dueDate: '22/07/1956',
	  priorityTask: task.priority.id, //this.priorityValue, //this.priority, // this.myForm.value.priorityTask,
	  status: task.status //this.actionTypes === ActionTypes.ADD ? false : true //this.myForm.value.status

    });
  }

createTask(){
		this.newTask.nameTask = this.myForm.value.nameTask;
 
        this.addTaskNew(this.newTask).subscribe({
			error: error => {
			  console.error('Error al crear el objeto****', error);
			  if (error.status===200) {
				console.log('La tarea ha sido creada con exito.');
				this.snackBar.open('La tarea ha sido creada con exito!!!', 'Completado', {
					duration: 3000, verticalPosition: "top", horizontalPosition: "end" 
				  }); 
				this.onCancelDialog();
			  }
			},
			complete: () => {
			  console.log('La tarea ha sido creada con exito.');
			  this.snackBar.open('La tarea ha sido creada con exito!!!', 'Completado', {
				duration: 3000, verticalPosition: "top", horizontalPosition: "end" 
			  });
			  this.onCancelDialog();
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
				duration: 3000, verticalPosition: "top", horizontalPosition: "end" 
			  }); 
	}

editTask(task: any) {
		//task.priorityTask = 3; //this.priorityValue;
		task.status= this.statusValue;
		console.log('add-edit/editTask1', task);
		console.log('add-edit/editTask2', this.statusValue);
		console.log('add-edit/editTask3', task.status);
		// task.status = true;

		this.editTaskNew(task.id, task).subscribe({

			error: error => {
				console.error('Error al editar el objeto****', error);
				if (error.status===200) {
				  console.log('La tarea ha sido editada con exito.');
				  this.snackBar.open('La tarea ha sido editada con exito!!!', 'Completado', {
					duration: 3000, verticalPosition: "top", horizontalPosition: "end" 
				  });
				}
				else {
					console.log('La tarea ha sido editada con exito.');
					this.snackBar.open('ERROR se ha producido', 'error.status:' + error.status, {
					  duration: 4000, verticalPosition: "top", horizontalPosition: "center" 
					});					
				}
				this.onCancelDialog();
			  },
			  complete: () => {
				console.log('La tarea ha sido editada con exito.');
				this.snackBar.open('La tarea ha sido editada con exito!!!', 'Completado', {
				  duration: 3000, verticalPosition: "top", horizontalPosition: "end" 
				});
				this.onCancelDialog(); 
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
