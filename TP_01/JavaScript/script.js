document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    document.getElementById("sortTasks").addEventListener("click", sortTasks);
});

//Gestion de la déconnexion
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('currentUser'); 
    document.location = 'index.html'; 
});

//Déclarations des éléments du DOM utilisés dans le script
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const clearAll = document.getElementById("clearAll");

// La fonction trim() en JavaScript est utilisée pour supprimer les espaces (espaces, tabulations et
//nouvelles lignes) au début et à la fin d'une chaîne.

//Rappel pour ajouter une tâche lorsque le bouton est cliqué
addTaskBtn.addEventListener("click", () => addTask(taskInput.value.trim()));

//Rappel pour effacer toutes les tâches lorsque le bouton est cliqué
clearAll.addEventListener("click", clearAllTasks);

function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}

//Fonction pour ajouter une tâche à la liste en créant un nouvel élément HTML
function addTaskToList(taskText, done = false) {
    const listItem = document.createElement("li");
    listItem.textContent = taskText;

    const doneBtn = document.createElement("img");
    doneBtn.setAttribute("src", "./Images/icons8-checkmark-50.png");
    doneBtn.setAttribute('height', '18px');
    doneBtn.setAttribute('width', '18px');
    listItem.appendChild(doneBtn);

    const editBtn = document.createElement("img");
    editBtn.setAttribute("src", "./Images/icons8-edit-file-50.png");
    editBtn.setAttribute('height', '18px');
    editBtn.setAttribute('width', '18px');
    listItem.appendChild(editBtn);

    const deleteBtn = document.createElement("img");
    deleteBtn.setAttribute("src", "./Images/icons8-delete-60.png");
    deleteBtn.setAttribute('height', '18px');
    deleteBtn.setAttribute('width', '18px');
    listItem.appendChild(deleteBtn);

    if (done) {
        listItem.classList.add('taskDone');
    }

    doneBtn.addEventListener("click", function() {
        if (listItem.classList.contains('taskDone')) {
            listItem.classList.remove('taskDone');

        } else {
            listItem.classList.add('taskDone');
        }
        saveTasks();
    });

    editBtn.addEventListener("click", function() {
        taskInput.value = listItem.textContent;
        listItem.remove();
        saveTasks();
    });

    deleteBtn.addEventListener("click", function() {
        listItem.remove();
        saveTasks();
    });

    taskList.appendChild(listItem);
    saveTasks();
}

//Fonction qui gère l'ajout d'une nouvelle tâche et vérifie si le texte de la tâche n'est pas vide
function addTask(taskText) { 

    if (taskText ) { 
        addTaskToList(taskText); 
        taskInput.value = "";
    } 
}

//Fonction pour récupérer l'utilisateur courant du localStorage
function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

//Fonction qui enregistre les tâches de l'utilisateur courant dans localStorage
function saveTasks() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert("Aucun utilisateur connecté.");
        return;
    }
    
    var tasks = [];
    
    for (var i = 0; i < taskList.children.length; i++) {
        var li = taskList.children[i];
        var taskStatus = li.classList.contains('taskDone') ? 'done' : 'notDone';
        var taskDescription = li.textContent + '|' + taskStatus; 
        tasks.push(taskDescription); 
    }

    localStorage.setItem(currentUser + '-tasks', tasks.join(','));
}

//Fonction qui charge les tâches de l'utilisateur courant à partir de localStorage
function loadTasks() {
    const currentUser = getCurrentUser();
    const tasks = (localStorage.getItem(currentUser + '-tasks') || '').split(',');
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const parts = task.split('|');
        if (parts.length === 2) {
            addTaskToList(parts[0], parts[1] === 'done'); 
        }
    });
}

//Fonction qui efface toutes les tâches après confirmation de l'utilisateur
function clearAllTasks() {
    if (confirm('Êtes-vous sûr de vouloir effacer toutes les tâches?')) {
        localStorage.clear();
        taskList.innerHTML = '';
        loadCategories();
    }
}


//Variable globale pour suivre l'état du tri
let sortAscending = true;

//Fonction qui trie les tâches dans l'ordre croissant ou décroissant
function sortTasks() {
    let tasksListItems = [];
    for (let i = 0; i < taskList.children.length; i++) {
        tasksListItems.push(taskList.children[i]);
    }
    
    tasksListItems.sort((a, b) => {
        let textA = a.textContent.toLowerCase();
        let textB = b.textContent.toLowerCase();

        if (sortAscending) {
            return textA.localeCompare(textB);
        } else {
            return textB.localeCompare(textA);
        }
    });

    tasksListItems.forEach(task => taskList.appendChild(task));
    
    sortAscending = !sortAscending;
    saveTasks();
}


