export interface IPriorities {
	id: number;
	namePriority: string;
}


export interface  TaskModel {
    id: number;
    nameTask: string;
    description: string;
    dueDate: Date;
    priorityTask: IPriorities;
    status: boolean; 
}
