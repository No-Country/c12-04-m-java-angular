import { Component } from '@angular/core';
import { TaskModel} from './../../../models/task.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActionTypes } from '@shared/action-types.enum';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss'],
})
export class AddEditTaskComponent {
	actionTypes: ActionTypes | undefined;
	id_Index: number;
	myForm: FormGroup;  

  users = [
    {name: 'Percy'},
    {name: 'David'},
    {name: 'Gonzalo'},
    {name: 'Gary'},
    {name: 'Javier'},
    {name: 'Agustin'}    
  ]

  constructor(
		private fb: FormBuilder,
		private taskService: TaskService,
		private router: Router,
		private aRoute: ActivatedRoute,
		public snackBar: MatSnackBar
	) {
		this.myForm = this.fb.group({
			name: ['', [Validators.required, Validators.maxLength(15)]],
			description: ['', [Validators.required]],
			expiredDate: [Date.now],
			// gender: ['', [Validators.required]],
			// email: ['', [Validators.required, Validators.email]],
		});

		const idParam = 'id';
		this.id_Index = this.aRoute.snapshot.params[idParam];
	}

  SaveTask() {
	const task: TaskModel = {
	  id: 0,
      name: '',
      description: '',
	  expiredDate: new Date('2022-10-31'),
	  priority: 1,
	  status:''
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
		this.taskService.addTask(task);
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
