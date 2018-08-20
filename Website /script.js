function updateDisplay() {
    var url = "http://localhost:5000/api/todo"
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = "application/json";

    request.onload = function () {
        var print = document.querySelector("#listOfItems");
        var arrJson = JSON.parse(request.response);
        for(i = 0; i < arrJson.length; i++) {
            var currentObject = arrJson[i];
            var todoObject = {
                Id: currentObject.id,
                Name: currentObject.name,
                IsDone: currentObject.isDone
            }
            if (print != null) {
                var content = createNewTodoItemElement(print, todoObject)
                print.appendChild(content);
                
            }
        }
    };

    request.send();
};

function createNewTodoItemElement(onItem, newObject) {
    var entry = document.createElement('li')
    var concatProperties = "Id: " + newObject.Id + "</br>Name: " + newObject.Name + "</br>IsDone: " + (newObject.IsDone === true ?  "√" : "x")
    entry.innerHTML += "<p>" + concatProperties + "</p>"
    return entry
}
updateDisplay();
