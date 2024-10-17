document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("todo-input"),
        addTaskButton = document.getElementById("add-task-btn"),
        todoList = document.getElementById("todo-list"),
        para = document.querySelector("p");

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => renderTask(task));

    addTaskButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") {
            para.style.display = "block";
            return;
        };

        para.style.display = "none";
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }

        todoInput.value = ""; //clear input
        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
    });

    function renderTask(task) {
        const li = document.createElement('li')
        li.setAttribute('data-id', task.id)
        if (task.completed) li.classList.add("completed");
        li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
        `;

        li.addEventListener('click', (e)=> {
            if(e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed;
            li.classList.toggle('completed')
            saveTasks();
        })

        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation() //prevent toggle from firing
            tasks = tasks.filter(t => t.id !== task.id)
            li.remove()
            saveTasks()
        })

        todoList.appendChild(li)
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }



})