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
		@Inject(MAT_DIALOG_DATA) public data: TaskModel
  ){
	console.log('data..', data)
    this.myForm = new FormGroup({
		id: new FormControl(data.id),
		nameTask: new FormControl(data.nameTask),
		// nameTask: this.myForm.get('nameTask')?.value,
		description: new FormControl(data.description),
		dueDate: new FormControl(data.dueDate),
		priorityTask: new FormControl(data.priorityTask),
		status: new FormControl(data.status),
    });

	// this.myForm.patchValue({
	// 	nameTask: data.nameTask,
	// 	description: data.description,
	// 	dueDate: data.dueDate,
	// 	priorityTask: data.priorityTask,
	// 	status: data.status,
	// });


	this.actionTypes = data.id === 0 ? ActionTypes.ADD : ActionTypes.EDIT;
	this.actionTitle = data.id === 0 ? 'Agregar Tarea' : 'Editar Tarea';

		const idParam = 'id';
		this.id_Index = this.aRoute.snapshot.params[idParam];
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

		switch (this.actionTypes) {
			case ActionTypes.ADD:
				this.addTask(task);
				break;
			case ActionTypes.EDIT:
				this.editTask(task);
				break;
		}
	}

	addTask(task: TaskModel) {
		//this.taskService.addTask(task);----------------------------------------------------------------------------------------------
		this.snackBar.open('The task has beed added succesfuly!', '', { duration: 3000 });
		this.router.navigate(['tasks']);
	}

	editTask(task: TaskModel) {
		// this.taskService.editTask(task, this.id_Index);
		// this.snackBar.open('The task has been updated succesfuly!', '', {
		// 	duration: 3000,
		// });

		this.router.navigate(['tasks']);
	}  

}
