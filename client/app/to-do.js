"use strict";
/**
 * Object representation of a todo.
 */
var ToDo = (function () {
    function ToDo() {
        // Flag indicating whether this is the last item.
        // Used to append a new todo.
        this.lastItem = false;
    }
    return ToDo;
}());
exports.ToDo = ToDo;
//# sourceMappingURL=to-do.js.map