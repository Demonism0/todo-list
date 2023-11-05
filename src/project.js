class Project {
    constructor (name) {
        this.name = name,
        this.items = [];
    };

    addItem (todo) {
        this.items.push(todo);
    }

    deleteTodo (todo) {
        let todoIndex = this.items.indexOf(todo);
        this.items.splice(todoIndex, 1);
    }

    deleteProject (projectArray) {
        let projectIndex = projectArray.indexOf(this);
        projectArray.splice(projectIndex, 1);
    }
}

export { Project };