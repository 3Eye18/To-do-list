function loadContent() {
    document.addEventListener("DOMContentLoaded", (event) => {
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
            if(localStorage.getItem(i)) {
                var data = localStorage.getItem(i).split(",")
                var tableRow = document.createElement("tr")

                // Name
                var nameRow = document.createElement("td")
                var name = document.createTextNode(data[0])
                nameRow.appendChild(name)

                var idSpan = document.createElement("span")
                idSpan.style.display = "none"
                var id = document.createTextNode(i)
                idSpan.appendChild(id)
                // nameRow.appendChild(idSpan)

                // Description
                var descRow = document.createElement("td")
                var desc = document.createTextNode(data[1])
                descRow.appendChild(desc)

                // Adding action buttons (delete and edit)
                var actionRow = document.createElement("td")

                var deleteButton = document.createElement("button")
                deleteButton.setAttribute("onclick", "deleteRow(this)")
                deleteButton.innerText = "Delete"
                // deleteButton.classList.add("button", "delete-button")
                
                var editButton = document.createElement("button")
                editButton.setAttribute("onclick","editRow(this)")
                editButton.innerText = "Edit"
                // editButton.classList.add("button", "edit-button")

                actionRow.appendChild(deleteButton)
                actionRow.appendChild(editButton)

                // Finishing
                tableRow.appendChild(nameRow)
                tableRow.appendChild(descRow)
                tableRow.appendChild(actionRow)
                tableRow.appendChild(idSpan)
                tableBody.appendChild(tableRow)
            }
        }
    });
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
        alert("Added successfully")
        document.querySelector(".form-input-name").value = ""
        document.querySelector(".form-input-desc").value = ""
    } else {
        alert("Do not leave fields empty")
    }
}

function deleteRow(button) {
    if(confirm("Do you really wanna delete this row?")) {
        var parentRow = button.closest("tr")
        var idSpan = parentRow.lastChild
        var id = Number(idSpan.innerText)
        localStorage.removeItem(id)
        parentRow.remove()
    }
}

function editRow(button) {
    var row = button.closest('tr');
    var cells = row.cells;

    // Switch to edit mode (replace text with input fields)
    for (var cell of cells) {
        if (cell !== cells[cells.length - 1]) {
            var text = cell.innerText;
            cell.innerHTML = `<input type="text" value="${text}">`;
        }
    }

    // Add a "Save" button
    cells[cells.length - 1].innerHTML = '<button onclick="saveChanges(this)">Save</button>';
}

function saveChanges(button) {
    var row = button.closest('tr');
    var cells = row.cells;

    // Capture updated data from input fields
    var newName = cells[0].querySelector('input').value;
    var newDesc = cells[1].querySelector('input').value;

    // Update the row with new data
    cells[0].innerText = newName;
    cells[1].innerText = newDesc;

    // Update the data in localStorage
    var idSpan = row.lastChild
    var id = Number(idSpan.innerText)
    localStorage.setItem(id, [newName, newDesc])

    // Switch back to display mode
    cells[cells.length - 1].innerHTML = `
        <button onclick="deleteRow(this)">Delete</button>
        <button onclick="editRow(this)">Edit</button>
    `;
}


loadContent()