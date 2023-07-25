import { Component, Inject } from '@angular/core';
import { TaskModel} from './../../../models/task.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActionTypes } from '@shared/action-types.enum';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';	

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss'],
})
export class AddEditTaskComponent {
	actionTypes: ActionTypes | undefined;
	id_Index: number;
	isVisible = true;
	myForm: FormGroup;  

  spaceId: number = 0;	
  dataSelected: any = {
    spaceId: 0,
    task: null
  }  

  users = [
    {name: 'Percy'},
    {name: 'David'},
    {name: 'Gonzalo'},
    {name: 'Gary'},
    {name: 'Javier'},
    {name: 'Agustin'}    
  ]

  actionTitle: string = 'Agregar Tarea';

//   constructor(
// 		private fb: FormBuilder,
// 		private taskService: TaskService,
// 		private router: Router,
// 		private aRoute: ActivatedRoute,
// 		public snackBar: MatSnackBar,
// 		public dialogRef: MatDialogRef<AddEditTaskComponent>
// 	) {
// 		this.myForm = this.fb.group({
// 			// name: ['', [Validators.required, Validators.maxLength(15)]],
// 			// description: ['', [Validators.required]],
// 			name: [''],
// 			description: [''],			
// 			dueDate: [Date.now],
// 			status: [''],
// 		});

// 		const idParam = 'id';
// 		this.id_Index = this.aRoute.snapshot.params[idParam];
// 	}

constructor(
		private fb: FormBuilder,
		private taskService: TaskService,
		private router: Router,
		private aRoute: ActivatedRoute,
		public snackBar: MatSnackBar,	
		private dialogRef: MatDialogRef<AddEditTaskComponent>,
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

	// this.myForm.patchValue({
	// 	nameTask: data.nameTask,
	// 	description: data.description,
	// 	dueDate: data.dueDate,
	// 	priorityTask: data.priorityTask,
	// 	status: data.status,
	// });


	this.actionTypes = data.task.id === 0 ? ActionTypes.ADD : ActionTypes.EDIT;
	this.actionTitle = data.task.id === 0 ? 'Agregar Tarea' : 'Editar Tarea';

	const idParam = 'id';
	this.id_Index = this.aRoute.snapshot.params[idParam];
	console.log('actionTypes', this.actionTypes);
	console.log('actionTitle', this.actionTitle)

  }

	ngOnInit(): void {
		// this.actionTypes = this.id_Index === undefined ? ActionTypes.ADD : ActionTypes.EDIT;
		// this.actionTitle = this.id_Index === undefined ? 'Agregar Tarea' : 'Editar Tarea';
		this.isVisible = this.actionTypes === ActionTypes.EDIT;
	}

	onCancelDialog(): void {
		this.dialogRef.close();
	  }


  SaveTask() {
	const task: TaskModel = {
	  id: this.actionTypes === ActionTypes.ADD ? 0 : this.myForm.value.id,
      nameTask: this.myForm.value.nameTask,
      description: this.myForm.value.description,
	  dueDate: this.myForm.value.dueDate, //new Date('2022-10-31'),
	  priorityTask: this.myForm.value.priorityTask,
	  status: this.actionTypes === ActionTypes.ADD ? '' : this.myForm.value.status
    };
	console.log('SaveTask', this.actionTypes);

		switch (this.actionTypes) {
			case ActionTypes.ADD:
				this.addTask(task);
				break;
			case ActionTypes.EDIT:
				this.editTask(task);
				break;
		}
	}

	// createTask(){
	// 	this.addTask(this.newSpace).subscribe((data) => {
	// 	   console.log('Objeto creado correctamente');
	// 	   window.location.reload();
	// 	 },
	// 	 (error) => {
	// 	   console.error('Error al crear el objeto', error);
	// 	 })}

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
			
		this.snackBar.open('Tarea agregada!', '', { duration: 3000 });
		// this.router.navigate(['home']);
	}

	editTask(task: TaskModel) {
		console.log('add-edit/editTask', task);
		// this.taskService.editTask(task, this.id_Index);
		// this.snackBar.open('The task has been updated succesfuly!', '', {
		// 	duration: 3000,
		// });

		this.router.navigate(['tasks']);
	}  

}
