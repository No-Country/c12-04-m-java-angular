import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TaskModel } from './../models/task.model';
import { env } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

	// taskList: any[] = [
	// 	{id: 1, name: 'Tarea 1', description:'Description 1', priority:1, status:'In Progress'},
	// 	{id: 2, name: 'Tarea 2', description:'Description 2', priority:2, status:'Completado'},
	// ]
  
  	apiUrl: string = 'https://localhost:3000/tasks';

	constructor(private httpClient: HttpClient) {}

	getTasks_azure(socialId: number): Observable<TaskModel[]> {
		//https://ninja-app-v1-api.azure-api.net/task/space?spaceId=151
		// socialId=151;
		console.log('services.getTasks-azure...', socialId);
		this.apiUrl = "https://ninja-app-v1-api.azure-api.net/";
		this.apiUrl = this.apiUrl + `task/space?spaceId=${socialId}`;
		console.log('services.getTasks-azure apiUrl...', this.apiUrl);
		return this.httpClient
			.get<any[]>(this.apiUrl)
	
		.pipe(catchError(this.handleError));
	}

  deleteTask(index: number) {
    // this.taskList.splice(index, 1);
  }

  addTask(empleado: TaskModel) {
    // this.taskList.unshift(empleado);
  }

  getTask(index: number) {
    // return this.taskList[index];
  }

  editTask(task: TaskModel, idTask: number){
    // this.taskList[idTask].name = task.nameTask;
    // this.taskList[idTask].description = task.description;
  }
  
  	// Handle API errors
	handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			console.error('An error occurred:', error.error.message);
		} else {
			console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
		}
		return throwError('Something bad happened; please try again later.');
	}  

	/*

	getTasks1() {
		return this.taskList.slice();
	}

  	getTasks(socialId: number): Observable<TaskModel[]> {
		console.log('services.getTasks...', socialId);
		this.apiUrl = 'http://localhost:3000/tasks';
			return this.httpClient
				.get<TaskModel[]>(this.apiUrl, {
					headers: new HttpHeaders({
						'content-type': 'application/json',
						encoding: 'UTF-8',
					}),
				})
				.pipe(catchError(this.handleError));
	}

	

	addTask(data: any): Observable<any> {
		return this.httpClient.post(this.apiUrl, data).pipe(catchError(this.handleError));
	}
  
	editTask(task: TaskModel): Observable<TaskModel> {
			return this.httpClient
				.put<TaskModel>(`${env.apiUrl}/${task.id}`, task, {
					headers: new HttpHeaders({
						description: 'Gary description',
					}),
				})
				.pipe(catchError(this.handleError));
		}




  */
}
