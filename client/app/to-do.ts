/**
 * Object representation of a todo.
 */
export class ToDo{
   constructor() 
	{ 
	}

  // Unique identifier
  _id: string;
  
  // Todo's name
  name: string;
  
  // Todo's description
  description: string;
  
  // Todo's Url
  url?: string;
  
  // Array of historic ratings
  ratings?: number[];
  
  // Video's average rating
  rating?: number;
  
  // Used to color the rating star element appropriately
  one?: string;
  two?: string;
  three?: string;
  four?: string;
  five?: string;
}
