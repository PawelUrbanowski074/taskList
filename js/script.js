{
    let tasks = [];
    let hideCompletedTasks = false;
    let allTaskFinished = false;

    const clearNewTaskInput = (newTaskInput) => {
        newTaskInput.focus();
        newTaskInput.value = "";
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        //isEveryTaskDone();
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
       // isEveryTaskDone();
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !(tasks[taskIndex].done) },
            ...tasks.slice(taskIndex + 1),
        ];
        //isEveryTaskDone();
        render();
    };

    const finishTasks = () => {
        tasks.forEach((task, index) => {
            tasks = [
                ...tasks.slice(0,index),
                {...task, done: true},
                ...tasks.slice(index + 1),
            ];
        });
        render();
    };

    const isEveryTaskDone = () => {
        allTaskFinished = (tasks.every(({done}) => done) ? true : false);
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const bindButtonsEvents = () => {
        if (tasks.length > 0) {
            const hideDone = document.querySelector(".js-hideDoneButton");
            const toggleAllDone = document.querySelector(".js-toggleAllDoneButton");
            
            hideDone.addEventListener("click", () => {
                hideCompletedTasks = !hideCompletedTasks;
                render();
            });

            toggleAllDone.addEventListener("click", () => {
                allTaskFinished = true;
                finishTasks();
            });
        }
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="unorderedList__listItem ${task.done && hideCompletedTasks ? "unorderedList__listItem--hidden" : ""}">
                    <button class="unorderedList__button unorderedList__button--done js-done">
                        <span class="unorderedList__buttonSpan ${task.done ? "unorderedList__buttonSpan--done" : ""}\">✔</span>
                    </button>
                    <span class=\"unorderedList__span ${task.done ? "unorderedList__span--done" : ""}\">${task.content}</span>
                    <button class="unorderedList__button unorderedList__button--remove js-remove">🗑</button>
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let buttonsHtmlString = "";
        if (tasks.length > 0) {
            buttonsHtmlString += `
            <button class="section__listButton js-hideDoneButton">Ukryj ukończone</button>
            <button ${allTaskFinished ? "disabled" : ""} class="section__listButton section__listButton--allDone js-toggleAllDoneButton ${allTaskFinished ? "section__listButton--disable" : "" }">Ukończ wszystkie</button>
            `;
        }
        document.querySelector(".js-taskListButtons").innerHTML = buttonsHtmlString;
    };

    const render = () => {
        isEveryTaskDone();
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskInput = document.querySelector(".js-newTask");
        const newTaskContent = newTaskInput.value.trim();

        if (newTaskContent === "") {
            newTaskInput.focus();
            return;
        }
        addNewTask(newTaskContent);
        clearNewTaskInput(newTaskInput);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };
    init();
}