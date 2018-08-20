var API_URL = "http://localhost:5000/api/todo"
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
                iscompleted:false
            }
        );

        requestObject.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        requestObject.onload = function () {
            updateDisplay();
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
        document.querySelector("#rawRetrievedData").innerHTML += requestObject.response

        var arrJson = JSON.parse(requestObject.response);
        var formattedTodoList = document.querySelector("#listOfItems")
        formattedTodoList.innerHTML = ""
        for (i = 0; i < arrJson.length; i++) {
            var currentObject = arrJson[i];
            var todoObject = {
                Id: currentObject.id,
                Name: currentObject.name,
                IsDone: currentObject.isDone,
                Alert: currentObject.alert.timeOfAlert,
                Color: currentObject.alert.alertColor
            }
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
    var concatProperties = "Id: " + newObject.Id + "</br>Name: " + newObject.Name + "</br>IsDone: " + (newObject.IsDone === true ? "√" : "x")
    entry.innerHTML += "<p>" + concatProperties + "</p>"
    if (Date.parse(newObject.Alert) < (new Date()).getTime()) {
        entry.style.color = newObject.Color
    }
    return entry
}
