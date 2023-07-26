import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TaskModel } from './../models/task.model';
import { env } from 'src/environment/environment';

interface DTOAddTask{
	nameTask: string;
}

@Injectable({
  providedIn: 'root'
})



export class TaskService {

  	// apiUrl: string = 'https://localhost:3000/tasks';
	apiUrl = "https://ninja-app-v1-api.azure-api.net/";

	constructor(private httpClient: HttpClient) {}

getTasks_azure(socialId: number): Observable<TaskModel[]> {
		//https://ninja-app-v1-api.azure-api.net/task/space?spaceId=151
		// socialId=151;
		console.log('services.getTasks-azure...', socialId);

		let url = this.apiUrl + `task/space?spaceId=${socialId}`;
		console.log('services.getTasks-azure apiUrl...', url);
		return this.httpClient
			.get<any[]>(url)
	
		.pipe(catchError(this.handleError));
	}

  deleteTask(index: number) {
    // this.taskList.splice(index, 1);
	let url = this.apiUrl + `task?id=${index}`	
	console.log('service-deleteTask', url);
	console.log('service-deleteTask-id', index);
	// return this.httpClient
	// 	.delete<any>(url)
	// 	.pipe(catchError(this.handleError));
		
	return this.httpClient.delete(url);
	
  }

  addTask_old(task: TaskModel, spaceId:number) {

	task.priorityTask.id = 1;
	task.priorityTask.namePriority = "Medio";
	task.status = false;

	let url = this.apiUrl + `task?spaceId=${spaceId}`;
	console.log('service-addTask', task);	
	console.log('service-apiUrl###', url);

	return this.httpClient.post(url, task.nameTask);		

  }

  addTask(dTOAddTask:any, spaceId:number): Observable<any>{
	let url = this.apiUrl + `task?spaceId=${spaceId}`;
	console.log('service-addTask', dTOAddTask);
	console.log('service-url', url);		
	// return this.httpClient.post<any>(url, dTOAddTask);
	return this.httpClient
	.post<any>(url, dTOAddTask, {
		headers: new HttpHeaders({
			'content-type': 'application/json',
			encoding: 'UTF-8',
		}),
	});

  }


  editTask(task: TaskModel, idTask: number){
	let url = this.apiUrl + `task/${task.id}`

	console.log('service-editTask', task);	
	console.log('service-editTask', url);

	return this.httpClient
		.put<TaskModel>(url, task)
		.pipe(catchError(this.handleError));

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
