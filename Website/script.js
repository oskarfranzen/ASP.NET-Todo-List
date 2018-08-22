var API_URL = "http://localhost:5000/api/todo"

class TodoObjectClass {
    constructor(_id, _name, _isDone, _alert, _color) {
        this.Id = _id;
        this.Name = _name;
        this.IsDone = _isDone;
        this.Alert = _alert;
        this.Color = _color;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    InitializeEvents();
    updateDisplay();
});



function InitializeEvents() {
    var addForm = document.querySelector("#addnewItemForm")
    addForm.onsubmit = function (e) {
        e.preventDefault()

        var requestObject = new XMLHttpRequest()
        requestObject.open('POST', API_URL)

        var nameOfItem = document.querySelector("#addTodoItem");

        var body = JSON.stringify(
            {
                name: nameOfItem.value,
                iscompleted: false
            }
        );

        requestObject.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        requestObject.onload = function () {
            var currentObject = JSON.parse(requestObject.response);
            debugger;
            var content = createNewTodoItemElement(new TodoObjectClass(currentObject.id, currentObject.name, currentObject.isDone, currentObject.alert.timeOfAlert, currentObject.alert.alertColor));
            document.querySelector("#listOfItems").appendChild(content)
        }
        requestObject.send(body)
        nameOfItem.value = ""
    }
}

function updateDisplay() {
    var requestObject = new XMLHttpRequest()

    requestObject.open('GET', API_URL);
    requestObject.responseType = "application/json";

    requestObject.onload = function () {
        // document.querySelector("#rawRetrievedData").innerHTML += requestObject.response

        var arrJson = JSON.parse(requestObject.response);
        var formattedTodoList = document.querySelector("#listOfItems")
        formattedTodoList.innerHTML = ""
        for (i = 0; i < arrJson.length; i++) {
            var currentObject = arrJson[i];
            var todoObject = new TodoObjectClass(currentObject.id, currentObject.name, currentObject.isDone, currentObject.alert.timeOfAlert, currentObject.alert.alertColor);
            
            if (formattedTodoList != null) {
                var content = createNewTodoItemElement(todoObject)
                formattedTodoList.appendChild(content);
            }
        }
    };

    requestObject.send();
};

function createNewTodoItemElement(newObject) {
    var entry = document.createElement('li')
    entry.className = "listItem"
    var concatProperties = "<b>Name:</b></br> " + (newObject.Name === "" ? "<i>n/a</i>" : newObject.Name) + "</br><b>Status:</b> " + (newObject.IsDone === true ? "√" : "X")
    entry.innerHTML += "<p>" + concatProperties + "</p>"
    if (Date.parse(newObject.Alert) < (new Date()).getTime()) {
        entry.style.color = newObject.Color
    }
    setTimeout(function () {
        entry.className = entry.className + " show"
    }, 100)

    return entry
}
