document.addEventListener("DOMContentLoaded", (event) => {
    // done
    function checkURL() {
        var url = window.location.href
        if(url.split('?').length > 1) {
            var item = url.split("?").pop();
            var word = item.split("=").shift();
            return item && word === 'isCreated';
        }
        return false;
    }

    // done
    function editTableRowInForm() {
        // Get data
        var isCreatePage = checkURL();
        if(!isCreatePage) {
            var id = Number(localStorage.getItem("currentID"))
            var dataArray = JSON.parse(localStorage.getItem("user"))
            var element = dataArray.find((item) => item.id === id)
            document.getElementById("name").value = element.name
            document.getElementById("desc").value = element.desc
            document.querySelector(".add-button").style.display = "none"
            document.querySelector(".edit-button").style.display = "block"
        } else {
            document.querySelector(".add-button").style.display = "block"
            document.querySelector(".edit-button").style.display = "none"
        }
    }

    editTableRowInForm()
})

function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            }
            element = element.parentElement
        }
    }

    var selectorRules = {}

    // rule checking
    function validate(inputElement, rule) {
        var errorMessage
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector('.form-message')

        // get rules of selectors
        var rules = selectorRules[rule.selector]

        // iterate through the rules
        // if error, stop iterating
        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) break
        }
                    
        if (errorMessage) {
            errorElement.innerText = errorMessage
            getParent(inputElement, options.formGroupSelector).classList.add('invalid')
        } else {
            errorElement.innerText = ''
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
        }   

        return errorMessage
    }

    // get element that need validation
    var formElement = document.querySelector(options.form)

    if (formElement) {
        // submit the form
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true

            options.rules.forEach(function(rule) {
                var inputElement = formElement.querySelector(rule.selector)
                var isValid = !validate(inputElement, rule)
                if (!isValid) {
                    isFormValid = false
                }
            })

            if (isFormValid) {
                // custom submit
                if (typeof options.onSubmit === 'function') {

                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])')

                    var formValues = Array.from(enableInputs).reduce(function(values, input) {
                        values[input.name] = input.value
                        return values
                    }, {})

                    options.onSubmit({
                        info: formValues,
                        submitter: e.submitter,
                    })
                } 
                // default submit, need to disable custom onSubmit in html file
                else {
                    formElement.submit()
                }
            }
        }

        // iterate through rules and listen to events
        options.rules.forEach(function(rule) {

            // saving rules for each input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]
            }

            var inputElement = formElement.querySelector(rule.selector)
            var errorElement = getParent(inputElement, options.formGroupSelector).querySelector('.form-message')

            if (inputElement) {
                // check on clicking out of input field
                inputElement.onblur = function() {
                    validate(inputElement, rule)
                }

                // check on changing input
                inputElement.oninput = function() {
                    errorElement.innerText = ''
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
                }
            }
        })
    }
}

Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : "Please fill this field"
        }
    }
}

Validator.notNumber = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            // /\d/ means any decimal number
            // something.test(string) return true if the string has "something"
            return !(/\d/.test(value)) ? undefined : "Name cannot contain number"
        }
    }
}

Validator.maxLength = function(selector, maxSize) {
    return {
        selector: selector,
        test: function(value) {
            return value.length <= maxSize ? undefined : `This field can't have more than ${maxSize} characters`
        }
    }
}

// done
Validator.addFormData = function(parsedData) {
    // localStorage.setItem("user", [])
    // localStorage.clear()

    // Getting data from localStorage
    var data
    try {
        data = localStorage.getItem("user")
    } catch(err) {}
    var dataArray = []
    var newObject = {}
    newObject.id = 1
    // Because data can be null if no entries
    if (!(data=="[]") && !(data==null) ) {
        dataArray = JSON.parse(data)
        newObject.id = dataArray[dataArray.length-1].id + 1
    }
    // Adding new info to object and array
    newObject.name = parsedData.name
    newObject.desc = parsedData.desc
    dataArray.push(newObject)
    localStorage.setItem("user", JSON.stringify(dataArray))
    alert("Added successfully!")
    window.location.href = './main.html';
}

// done
Validator.editFormData = function (parsedData) {
    var dataArray = JSON.parse(localStorage.getItem("user"))
    var id = Number(localStorage.getItem("currentID"))
    dataArray.map(function(item) {
        if (item.id === id) {
            item.name = parsedData.name
            item.desc = parsedData.desc
            localStorage.setItem("user", JSON.stringify(dataArray))
            alert("Edit successfully!")
            window.location.href = './main.html'
        }
    })
}





// TESTING ONLY!!!
Validator.testAdd = function() {
    fetch('https://dummyjson.com/posts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        title: 'I am in love with someone.',
        userId: 9,
        /* other post data */
    })
    })
    .then(res => res.json())
    .then(console.log);
}

Validator.testEdit = function() {
    /* updating title of post with id 1 */
    fetch('https://dummyjson.com/posts/1', {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        title: 'I think I should shift to the moon',
        })
    })
    .then(res => res.json())
    .then(console.log);
}