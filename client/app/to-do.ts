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
	author: string;
  
	// Todo's status
	status: string;
 
	// Flag indicating whether this is the last item.
	// Used to append a new todo.
	lastItem?: boolean;
}
