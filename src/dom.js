import { Project } from "./project.js";
import { default as Todo } from "./todo.js";
import { display } from "./index.js";

const Dom = (function () {
    const content = document.querySelector('div#content');

    const clearContent = () => {
        content.innerHTML = '';
    }

    const displayProject = (project) => {
        let projectContainer = document.createElement('div');
        projectContainer.setAttribute('class', 'project');
        let projectName = document.createElement('div');
        projectName.textContent = project.name;
        projectContainer.appendChild(projectName);

        content.appendChild(projectContainer);

        return projectContainer;
    };

    const displayTodo = (todo, project, projectContainer) => {
        let todoContainer = document.createElement('div');
        todoContainer.setAttribute('class', 'todo');
        todoContainer.addEventListener('click', () => {
            zoomedView(todo, project);
        });
        projectContainer.appendChild(todoContainer);

        let todoTitle = document.createElement('div');
        let todoDue = document.createElement('div');
        todoTitle.textContent = todo.title;
        todoDue.textContent = todo.dueDate;
        todoContainer.appendChild(todoTitle);
        todoContainer.appendChild(todoDue);
    }

    const newTodoBtn = (project, projectContainer) => {
        let todoCreator = document.createElement('button');
        todoCreator.textContent = 'Add New';
        todoCreator.addEventListener('click', () => {
            project.addItem(new Todo('','','',''));
            display.defaultView();
        })
        projectContainer.appendChild(todoCreator)
    }

    const delProjBtn = (project, projectArray, projectContainer) => {
        let deleteProj = document.createElement('button');
        deleteProj.textContent = 'Delete Project';
        deleteProj.addEventListener('click', () => {
            project.deleteProject(projectArray);
            display.defaultView();
        })
        projectContainer.appendChild(deleteProj);
    }

    const newProjCard = (projectArray) => {
        let newCard = document.createElement('div');
        newCard.setAttribute('class', 'project');
        newCard.setAttribute('id', 'new-card');
        let createProj = document.createElement('button');
        createProj.textContent = 'Add New'
        createProj.addEventListener('click', () => {
            let projectName = prompt("What do you want to call your project?");
            projectArray.push(new Project(projectName));
            display.defaultView();
        })
        newCard.appendChild(createProj);
        content.appendChild(newCard);
    }

    const zoomedView = (todo, project) => {
        let dialog = document.createElement('dialog');
        content.appendChild(dialog);

        let titleInput = document.createElement('input');
        let descInput = document.createElement('input');
        let dueInput = document.createElement('input');
        let prioInput = document.createElement('input');
        titleInput.setAttribute('type', 'text');
        descInput.setAttribute('type', 'text');
        dueInput.setAttribute('type', 'date');
        prioInput.setAttribute('type', 'number');
        titleInput.setAttribute('value', todo.title);
        descInput.setAttribute('value', todo.description);
        dueInput.setAttribute('value', todo.dueDate);
        prioInput.setAttribute('value', todo.priority);
        dialog.appendChild(titleInput);
        dialog.appendChild(descInput);
        dialog.appendChild(dueInput);
        dialog.appendChild(prioInput);

        closeTodoBtn(todo, titleInput, descInput, dueInput, prioInput, dialog);
        delTodoBtn(todo, project, dialog);

        dialog.showModal();
    }

    const closeTodoBtn = (todo, titleInput, descInput, dueInput, prioInput, 
        dialog) => {
        let closeBtn = document.createElement('button');
        closeBtn.textContent = 'Save & Close';
        closeBtn.addEventListener('click', () => {
            todo.title = titleInput.value;
            todo.description = descInput.value;
            todo.dueDate = dueInput.value;
            todo.priority = prioInput.value;
            dialog.close();
            display.defaultView();
        })
        dialog.appendChild(closeBtn);
    }

    const delTodoBtn = (todo, project, dialog) => {
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            project.deleteTodo(todo);
            dialog.close();
            display.defaultView();
        })
        dialog.appendChild(deleteBtn);
    }

    return { clearContent, displayProject, displayTodo, newTodoBtn, 
        delProjBtn, newProjCard };
})();

export { Dom };