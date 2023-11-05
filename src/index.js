import { Dom } from "./dom.js";
import "./style.css";

const display = (function () {
    let projectArray = [];

    const defaultView = function () {
        Dom.clearContent();

        for (let project of projectArray) {
            let projectContainer = Dom.displayProject(project);

            for (let todo of project.items) {
                Dom.displayTodo(todo, project, projectContainer);
            }

            Dom.newTodoBtn(project, projectContainer);
            
            Dom.delProjBtn(project, projectArray, projectContainer);
        }

        Dom.newProjCard(projectArray);
    }

    return { defaultView };
})();

display.defaultView();

export { display };