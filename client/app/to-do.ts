/**
 * Object representation of a todo.
 */
export class ToDo{
	constructor() { 
	}

	// Unique identifier
	_id: string;
	
	// Alternative id name
	id?: string;
  
	// Todo's title
	title: string;
  
	// Todo's description
	description: string;
  
	// Todo's author
	author: any;
  
	// Todo's status
	status: string;
	
	// Indicates whether this is deletable 	
	deletable: boolean = false;
	
	// Indicates whether this is editable
	editable: boolean = false;
}
