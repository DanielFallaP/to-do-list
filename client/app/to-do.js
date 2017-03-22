"use strict";
/**
 * Object representation of a todo.
 */
var ToDo = (function () {
    function ToDo() {
        // Indicates whether this is deletable 	
        this.deletable = false;
        // Indicates whether this is editable
        this.editable = false;
    }
    return ToDo;
}());
exports.ToDo = ToDo;
//# sourceMappingURL=to-do.js.map