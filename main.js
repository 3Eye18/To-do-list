function loadData() {
    var tableBody = document.querySelector("tbody")
    // Deleting all old data
    if (tableBody.children) {
        var childLength = tableBody.children.length
        for (var i = 0; i < childLength; i++) {
            tableBody.removeChild(tableBody.children[0])
        }
    }

    // Adding data from localStorage
    for (var i = 1; i <= localStorage.clickcount; i++) {
        var data = localStorage.getItem(i).split(",")
        var tableRow = document.createElement("tr")
        var nameRow = document.createElement("td")
        var name = document.createTextNode(data[0])
        nameRow.appendChild(name)
        var descRow = document.createElement("td")
        var desc = document.createTextNode(data[1])
        descRow.appendChild(desc)
        tableRow.appendChild(nameRow)
        tableRow.appendChild(descRow)
        tableBody.appendChild(tableRow)
        console.log("iterated " + i)
    }
}

function saveData() {
    // localStorage.clear()
    var name = document.querySelector(".form-input-name").value
    var desc = document.querySelector(".form-input-desc").value
    if (name && desc) {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount) + 1;
        } else {
            localStorage.clickcount = 1;
        }
        localStorage.setItem(localStorage.clickcount, [name, desc])
        console.log(localStorage.clickcount)
    } else {
        alert("Do not leave fields empty")
    }
}