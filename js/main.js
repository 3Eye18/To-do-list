document.addEventListener("DOMContentLoaded", (event) => {
    // done
    function loadContent() {
        var tableBody = document.querySelector("tbody")
        // Deleting all old data
        if (tableBody.children) {
            var childLength = tableBody.children.length
            for (var i = 0; i < childLength; i++) {
                tableBody.removeChild(tableBody.children[0])
            }
        }
    
        // Getting data from localStorage
        try {
            var dataArray = JSON.parse(localStorage.getItem("user"))
            // Adding data from localStorage to table
            dataArray.forEach((element) => {
                var tableRow = document.createElement("tr")
                // Name
                var nameRow = document.createElement("td")
                var name = document.createTextNode(element.name)
                nameRow.appendChild(name)
                // Description
                var descRow = document.createElement("td")
                var desc = document.createTextNode(element.desc)
                descRow.appendChild(desc)
                // Adding action buttons (delete and edit)
                var actionRow = document.createElement("td")
                var deleteButton = document.createElement("button")
                deleteButton.setAttribute("onclick", "deleteTableRow(this)")
                deleteButton.innerText = "Delete"
                var editButton = document.createElement("button")
                editButton.setAttribute("onclick","editTableRow(this)")
                editButton.innerText = "Edit"
                actionRow.appendChild(deleteButton)
                actionRow.appendChild(editButton)
                // ID
                var idSpan = document.createElement("span")
                idSpan.style.display = "none"
                var id = document.createTextNode(element.id)
                idSpan.appendChild(id)
                // Finishing
                tableRow.appendChild(nameRow)
                tableRow.appendChild(descRow)
                tableRow.appendChild(actionRow)
                tableRow.appendChild(idSpan)
                tableBody.appendChild(tableRow)
            })
        } catch(err) {
            // alert("This table has no notes yet!")
        }  
    }

    loadContent()
})

// done
function deleteTableRow(button) {
    if(confirm("Do you really wanna delete this row?")) {
        // Get ID
        var parentRow = button.closest("tr")
        var idSpan = parentRow.lastChild
        var id = Number(idSpan.innerText)
        // Remove object with that ID
        var dataArray = JSON.parse(localStorage.getItem("user"))
        dataArray.forEach((element) => {
            if (element.id == id) {
                var index = dataArray.indexOf(element)
                dataArray.splice(index, 1)
            }
        })
        localStorage.setItem("user", JSON.stringify(dataArray))
        parentRow.remove()
    }
}

// done
function editTableRow(button) {
    // Get ID
    var id = Number(button.closest("tr").lastChild.innerText)
    localStorage.setItem("currentID", String(id))
    window.location.href = './form.html';
}