function alertDimensions() {
    let viewportWidth;
    let viewportHeight;
    let anotherViewportWidth;
    let anotherViewportHeight;
    viewportHeight = window.innerHeight;
    viewportWidth = window.innerWidth;
    anotherViewportHeight = document.documentElement.clientHeight;
    anotherViewportWidth = document.documentElement.clientWidth;

    alert("window: " + viewportWidth + ":" + viewportHeight + "\n" + "document: " + anotherViewportWidth + ":" + anotherViewportHeight);
}

//handles update of hint score when hint is viewed
function updateHintScore(ev) {
    //grab scoreTables div
    let tableBodyDiv = document.getElementById('tableBody').children;
    //grab currentDrink
    let currentDrink = document.getElementById('currentRecipeCard').firstElementChild.firstElementChild.innerHTML;
    //find currentDrink row on table
    for (let j = 0; j < tableBodyDiv.length; j += 2) {
        if (tableBodyDiv[j].firstElementChild.innerHTML == currentDrink) {
            //overwrite hintScore for row
            tableBodyDiv[j].lastElementChild.innerHTML = "";
            tableBodyDiv[j].lastElementChild.innerHTML = "-5%";
        }
    }
}

//filter function for inventory items
function filter() {
    //grab select tag
    let selection = $("select");
    //grab inventoryItems collection
    let inventoryItems = document.getElementsByClassName("inventoryItem");
    let objectsOnInventory = [];
    let j = 0;
    //filter collection of items to remove those that are not inside #inventoryItems
    for (let i = 0; i < inventoryItems.length; i++) {
        if (inventoryItems[i].parentElement.id == "inventoryItems") {
            objectsOnInventory[j] = inventoryItems[i];
            j += 1;
        }
    }
    //we filter now based on items objectsOnInventory
    //check if selection is "all" as in filter none, or view all items
    if (selection.val() == "all") {
        //cycle through items
        for (let i = 0; i < objectsOnInventory.length; i++) {
            //show items
            if (objectsOnInventory[i].classList.contains("d-none") == true) {
                objectsOnInventory[i].classList.remove("d-none");
            }
        }
    } else {
        //cycle through items to see if they belong to selected class to view
        for (let i = 0; i < objectsOnInventory.length; i++) {
            //checks id value to ignore items with empty id
            if (objectsOnInventory[i].id !== "") {
                //check if selected class is found in item classlist
                if (objectsOnInventory[i].classList.contains(selection.val()) == true) {
                    if (objectsOnInventory[i].classList.contains("d-none") == true) {
                        //if hidden, unhide
                        objectsOnInventory[i].classList.remove("d-none");
                    }
                } else {
                    //item not relevant for desired view, filtered item
                    if (objectsOnInventory[i].classList.contains("d-none") == false) {
                        //if not hidden, hide
                        objectsOnInventory[i].classList.add("d-none");
                    }
                }
            }
        }
    }
}

//mousewheel horizontal scroll for inventory items
$('#inventoryItems').bind('wheel', function (e) {
    e.preventDefault();
    this.scrollLeft += (25 * e.originalEvent.deltaY);
})

//handles when inventory item's drag starts
function dragstartHandler(ev) {
    console.log("dragStart");
    // Add this element's id to the drag payload so the drop handler will
    // know which element to add to its tree
    var dataList = ev.dataTransfer.items;
    dataList.add(ev.target.id, "text");
    // Add some other items to the drag payload 
    //dataList.add("<p>... paragraph ...</p>", "text/html");
    //dataList.add("http://www.example.org", "text/uri-list");
}

//handles the drop of an inventory item on a box
function dropHandler(ev) {
    ev.preventDefault();
    let dropped = false;
    //make sure destination div gets opacity back
    ev.target.style.opacity = 1;
    //get inventory item id to grab object
    let data = ev.dataTransfer.getData("text");
    let draggedObj = document.getElementById(data);
    //enters if destinationDiv is id #inventoryItem
    if (ev.target.id == "inventoryItems") {
        //imports inventory item from ingredient to inventoryItems
        ev.target.appendChild(document.getElementById(data));
        dropped = true;
    }
    //enters if destinationDiv is empty ingredient in mixZone
    else if (ev.target.childElementCount < 1) {
        //enters if draggedObj is base
        if (draggedObj.classList.contains("base") == true) {
            //enters if destinationDiv is base
            if (ev.target.classList.contains("base") == true) {
                //imports inventoryItem into ingredient space
                ev.target.appendChild(document.getElementById(data));
                dropped = true;
            }
        }
        //enters if draggedObj is addtion
        else if (draggedObj.classList.contains("addition") == true) {
            //enters if destinationDiv is addition
            if (ev.target.classList.contains("addition") == true) {
                //imports inventoryItem into ingredient space
                ev.target.appendChild(document.getElementById(data));
                dropped = true;
            }
        }
        //enters if draggedObj is ornament
        else if (draggedObj.classList.contains("ornament") == true) {
            //enters if destinationDiv is ornament
            if (ev.target.classList.contains("ornament") == true) {
                //imports inventoryItem into ingredient space
                ev.target.appendChild(document.getElementById(data));
                dropped = true;
            }
        }
        //enters if draggedObj is crystal
        else if (draggedObj.classList.contains("crystal") == true) {
            //enters if destinationDiv is crystal
            if (ev.target.classList.contains("crystal") == true) {
                //imports inventoryItem into ingredient space
                ev.target.appendChild(document.getElementById(data));
                dropped = true;
            }
        }
    }
    //enters if destination div was full with item
    else {
        ev.stopPropagation();
        alert("Espacio de ingrediente lleno.");
        //to avoid dropped == false if
        dropped = true;
    }
    //enters if there was no match / input dropped in wrong place
    if (dropped == false) {
        ev.stopPropagation();
        alert("Asignación inválida de ingrediente.");
    }
}

//handles dragging over a destination container
function dragoverHandler(ev) {
    //enters if destination div is #inventoryItems
    if (ev.target.id == "inventoryItems") {
        //allows dragover
        ev.preventDefault();
        ev.target.style.opacity = 1;
        // Set the dropEffect to move
        ev.dataTransfer.dropEffect = "move";
        //affect style
        if (ev.target.style.opacity == 1) {
            ev.target.style.opacity = 0.2
        }
    }
    //enters if destination is ingredients in mix zone
    else if (ev.target.classList.contains("ingredient")) {
        //enters if destination div is empty
        if (ev.target.childElementCount < 1) {
            //allows dragover
            ev.preventDefault();
            ev.target.style.opacity = 1;
            // Set the dropEffect to move
            ev.dataTransfer.dropEffect = "move";
            //affect style
            if (ev.target.style.opacity == 1) {
                ev.target.style.opacity = 0.2
            }
        }
        //does nothing if destination is filled or is an item
    }
}

//handles drag leave
function dragleaveHandler(ev) {
    ev.preventDefault();
    //affect style
    if (ev.target.style.opacity < 1) {
        ev.target.style.opacity = 1;
    }
}

//handles drag end from inventoryItem dragged
function dragendHandler(ev) {
    ev.preventDefault();
    var dataList = ev.dataTransfer.items;
    // Clear any remaining drag data
    dataList.clear();
}

//handles methodZone button group
function activateBtn(ev) {
    //for each button in methodDiv
    for (let childBtn = ev.target.parentNode.firstElementChild; childBtn !== null; childBtn = childBtn.nextElementSibling) {
        //enters if this is targeted button to add active class
        if (childBtn.innerHTML == ev.target.innerHTML) {
            childBtn.classList.add("active");
        }
        // enters to remove class from wrong button (if it has it) 
        else {
            childBtn.classList.remove("active");
        }
    }
}

//handles document ready routines
$(function () {
    refreshInventory();
    
});

//handles startTest click
function testLogin(ev) {
    //hide div with start test button
    let divToHide = ev.target.parentElement;
    divToHide.hidden = true;
    //validate if user is logged in
    //if not logged in, show div 2 for login/register and end function
    //in the meantime, get user name
    document.getElementById('loginDiv').hidden = false;
    //$('#loginDiv').show('fade');
}


//handles test start
function startTest(ev) {
    //get user name from input
    let userName = $('#materialLoginFormEmail').val();
    console.log(userName);
    
    //hide div with start test button
    document.getElementById('loginDiv').hidden = true;


    //import recipes from JSON file
    //new xmlhttprequest
    let xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //get response text
            let docResponse = JSON.parse(xhttp.responseText);
            //recipes has recipes as js objects
            let recipes = docResponse.recipe;
            //select three random recipes
            let rndSelections = [];
            let j = 0;
            for (i = 1; i < 4; i++) {
                let rndNumber = 1 + Math.floor(Math.random() * recipes.length - 1);
                //first selection
                if (rndSelections.length < 1) {
                    rndSelections[j] = rndNumber;
                    j += 1;
                }
                //next selections
                else {
                    let repeated = false;
                    //cycle through rndSelections to check rndNumber is different
                    for (let x = 0; x < rndSelections.length; x++) {
                        if (rndNumber == rndSelections[x]) {
                            repeated = true;
                        }
                    }
                    //if number is repeated, cycle i for again...
                    if (repeated == true) {
                        i -= 1;
                    }
                    //else, register new rndSelections
                    else {
                        rndSelections[j] = rndNumber;
                        j += 1;
                    }
                }
            }
            //randomNumbers represent random Id selected for recipes to evaluate on test
            //show scenario 3 divs
            document.getElementById('testResultsZone').hidden = false;
            //create selectedRecipes collection
            let selectedRecipes = [];
            for (let i = 0; i < rndSelections.length; i++) {
                selectedRecipes[i] = recipes[rndSelections[i]];
            }
            //create ingredient divs on mixZone for first recipe
            //count elements for each class: base, addition & ornaments
            //crystal is always one ingredient and method always has five options
            refreshMixZone(selectedRecipes[0]);            
            //fill up testResults zone
            //write name on cardHeader h4
            let recipeCard = document.getElementById('currentRecipeCard');
            recipeCard.firstElementChild.firstElementChild.innerHTML = selectedRecipes[0].name;

            //write userName on cardHeader h4
            let userNameCard = document.getElementById('userTestScores');
            userNameCard.firstElementChild.firstElementChild.innerHTML = userName;
            //write table with scores on tableBody
            //build tableBody html
            let tableBodyHTML = "";
            //cycle through all selectedRecipes
            for (let i = 0; i < selectedRecipes.length; i++) {
                tableBodyHTML += `
                                <tr>
                                    <td scope="row" class="text-left">${selectedRecipes[i].name}</td>
                                    <td></td>
                                    <td></td>
                                <tr>`;
            }
            document.getElementById('tableBody').innerHTML = "";
            document.getElementById('tableBody').innerHTML = tableBodyHTML;
            //update hintModal content
            let hintModal = document.getElementById('hintsModal').parentElement.nextElementSibling;
            hintModal.firstElementChild.innerHTML = selectedRecipes[0].hint;
        }
    };
    xhttp.open("GET", "/JSON/cocktailRecipes.json", true);
    xhttp.send();
}

//handles serve cocktail
function serveDrink(ev) {
    //load recipes
    //import recipes from JSON file
    //new xmlhttprequest
    let recipes = [];
    let thisRecipe;
    let xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //get response text
            let docResponse = JSON.parse(xhttp.responseText);
            //recipes has recipes as js objects
            recipes = docResponse.recipe;
            //now get current drink from table header
            let currentDrink = document.getElementById('currentRecipeCard').firstElementChild.firstElementChild.innerHTML;
            //get servedDrink as array of inventoryItem id's
            let servedDrink = [];
            //get jsonServedDrink as json syntax text for file in future
            let jsonServedDrink = `
                                    {
                                    "userName": "nombreUsuario",
                                    "drinkName": "${currentDrink}",`;
            //to get servedDrink we cycle through each zone, start with base
            let x = 0;
            let currentChildren = document.getElementById('baseIngredients').children;
            //cycle through ingredient div in base
            for (let j = 0; j < currentChildren.length; j++) {
                //check if ingredient div is not empty
                if (currentChildren[j].innerHTML !== "") {
                    //array build
                    servedDrink.push([x]);
                    servedDrink[x][0] = "base";
                    servedDrink[x][1] = currentChildren[j].firstElementChild.id;
                    x += 1;
                    //json text build
                    //if there is more than one base
                    if (currentChildren.length > 1) {
                        //first base treatment
                        if (j == 0) {
                            jsonServedDrink += `
                                                "base": [ "${currentChildren[j].firstElementChild.id}",`;
                        }
                        //last base treatment
                        else if (j == currentChildren.length - 1) {
                            jsonServedDrink += `
                                                "${currentChildren[j].firstElementChild.id}" ]`;
                        }
                        //else
                        else {
                            jsonServedDrink += `
                                                "${currentChildren[j].firstElementChild.id}",`;
                        }
                    }
                    //if there is only one base
                    else {
                        jsonServedDrink += `
                                            "base": "${currentChildren[j].firstElementChild.id}"`;
                    }
                }
            }
            //now with addition
            currentChildren = document.getElementById('additionIngredients').children;
            //cycle through ingredient div in addition
            for (let j = 0; j < currentChildren.length; j++) {
                //check if ingredient div is not empty
                if (currentChildren[j].innerHTML !== "") {
                    //array build
                    servedDrink.push([x]);
                    servedDrink[x][0] = "addition";
                    servedDrink[x][1] = currentChildren[j].firstElementChild.id;
                    x += 1;
                    //json text build
                    //if there is more than one addition
                    if (currentChildren.length > 1) {
                        //first addition treatment
                        if (j == 0) {
                            jsonServedDrink += `,
                                                "addition": [ "${currentChildren[j].firstElementChild.id}",`;
                        }
                        //last addition treatment
                        else if (j == currentChildren.length - 1) {
                            jsonServedDrink += `
                                                "${currentChildren[j].firstElementChild.id}" ]`;
                        }
                        //else
                        else {
                            jsonServedDrink += `
                                                "${currentChildren[j].firstElementChild.id}",`;
                        }
                    }
                    //if there is only one addition
                    else {
                        jsonServedDrink += `,
                                            "addition": "${currentChildren[j].firstElementChild.id}"`;
                    }
                }
            }
            //now with method
            //cycle through buttons and find active one
            currentChildren = document.getElementById('methodButtons').children;
            for (let j = 0; j < currentChildren.length; j++) {
                //find out which child is class="active"
                if (currentChildren[j].classList.contains('active') == true) {
                    //array build
                    servedDrink.push([x]);
                    servedDrink[x][0] = "method";
                    servedDrink[x][1] = currentChildren[j].value;
                    x += 1;
                    //json text build
                    jsonServedDrink += `,
                                        "method": "${currentChildren[j].value}"`;
                    //force for exit
                    j = currentChildren.length + 1;
                }
            }
            //now with crystals
            currentChildren = document.getElementById('crystalIngredients').firstElementChild;
            //check if ingredient div is not empty
            if (currentChildren.innerHTML !== "") {
                //array build
                servedDrink.push([x]);
                servedDrink[x][0] = "crystal";
                servedDrink[x][1] = currentChildren.firstElementChild.id;
                x += 1;
                //json text build
                jsonServedDrink += `,
                            "crystal": "${currentChildren.firstElementChild.id}"`;

            }
            //now with ornaments
            currentChildren = document.getElementById('ornamentIngredients').children;
            for (let j = 0; j < currentChildren.length; j++) {
                //check if ingredient div is not empty
                if (currentChildren[j].innerHTML !== "") {
                    //array build
                    servedDrink.push([x]);
                    servedDrink[x][0] = "ornament";
                    servedDrink[x][1] = currentChildren[j].firstElementChild.id;
                    x += 1;
                    //json text build
                    //if there is more than one ornament
                    if (currentChildren.length > 1) {
                        //first ornament treatment
                        if (j == 0) {
                            jsonServedDrink += `,
                                                "ornament": [ "${currentChildren[j].firstElementChild.id}",`;
                        }
                        //last ornament treatment
                        else if (j == currentChildren.length - 1) {
                            jsonServedDrink += `
                                                "${currentChildren[j].firstElementChild.id}" ]`;
                        }
                        //else
                        else {
                            jsonServedDrink += `
                                                "${currentChildren[j].firstElementChild.id}",`;
                        }
                    }
                    //if there is only one ornament
                    else {
                        jsonServedDrink += `,
                                            "ornament": "${currentChildren[j].firstElementChild.id}"`;
                    }
                }
            }
            //complete json text build
            jsonServedDrink += `
                                  }`;
            //up to here we have what user submitted as servedDrink (2-dim array) and as 
            //jsonServedDrink, so it can be added to file or sent to server as json object
            //now we compare recipe with user submitted recipe and buil resultsModal content
            for (let j = 0; j < recipes.length; j++) {
                //find recipe for this servedDrink
                if (recipes[j].name == currentDrink) {
                    thisRecipe = recipes[j];
                }
            }
            //this is resultsModal content html
            resultsModalContentHTML = `
                                        <div class="col-8">
                                        <h4 class="mb-3">${currentDrink}</h4>
                                        <ul>`;
            //this variables holds positive checks; this could be done with only one variable
            //but chose to do it like this so we can have better stats later on
            let baseChecks = 0, baseUnchecked = 0; 
            let additionChecks = 0, additionUnchecked = 0;
            let methodChecks = 0, methodUnchecked = 0;
            let crystalChecks = 0, crystalUnchecked = 0;
            let ornamentChecks = 0, ornamentUnchecked = 0;
            //base elements check!
            //validate if recipe has more than 1 base element
            let ingredientCheck = false;
            if (Array.isArray(thisRecipe.base) == true) {
                //cycle through all bases in recipe[j]
                for (let z = 0; z < thisRecipe.base.length; z++) {
                    ingredientCheck = false;
                    //now we check presence of ingredient in servedDrink
                    for (let w = 0; w < servedDrink.length; w++) {
                        //check only base elements in servedDrink
                        if (servedDrink[w][0] == "base") {
                            //check if base is the same as thisRecipe.base[z]
                            if (servedDrink[w][1] == thisRecipe.base[z]) {
                                //if entered here, then recipe ingredient is found in servedDrink
                                ingredientCheck = true;
                            }
                        }
                    }
                    //if ingredientChecked we modify resultsModal content with success
                    if (ingredientCheck == true) {
                        baseChecks += 1;
                        resultsModalContentHTML += `
                                                    <li>${document.getElementById(thisRecipe.base[z]).firstElementChild.nextElementSibling.innerHTML}   <span class="badge badge-success"><i class="fa fa-check-circle" aria-hidden="true"></i></span></li>`;
                    }
                    //if ingredientChecked is false then we use danger
                    else {
                        baseUnchecked += 1;
                        resultsModalContentHTML += `
                                                    <li>${document.getElementById(thisRecipe.base[z]).firstElementChild.nextElementSibling.innerHTML}   <span class="badge badge-danger"><i class="fa fa-times-circle" aria-hidden="true"></i></span></li>`;
                    }
                }
            }
            //else, if recipes has only one base
            else {
                //check presence of ingredient in servedDrink
                ingredientCheck = false;
                for (let w = 0; w < servedDrink.length; w++) {
                    //check only base elements in servedDrink
                    if (servedDrink[w][0] == "base") {
                        //check if base is the same as thisRecipe.base[z]
                        if (servedDrink[w][1] == thisRecipe.base) {
                            baseChecks += 1;
                            resultsModalContentHTML += `
                                                        <li>${document.getElementById(thisRecipe.base).firstElementChild.nextElementSibling.innerHTML}  <span class="badge badge-success"><i class="fa fa-check-circle" aria-hidden="true"></i></span></li>`;
                            ingredientCheck = true;
                        }
                    }
                }
                if (ingredientCheck == false && typeof thisRecipe.base !== "undefined") {
                    baseUnchecked += 1;
                    resultsModalContentHTML += `
                                                <li>${document.getElementById(thisRecipe.base).firstElementChild.nextElementSibling.innerHTML}  <span class="badge badge-danger"><i class="fa fa-times-circle" aria-hidden="true"></i></span></li>`;
                }
            }
            //addition elements check!
            //validate if recipe has more than 1 addition element
            if (Array.isArray(thisRecipe.addition) == true) {                
                //cycle through all addition in recipe[j]
                for (let z = 0; z < thisRecipe.addition.length; z++) {
                    ingredientCheck = false;
                    //now we check presence of ingredient in servedDrink
                    for (let w = 0; w < servedDrink.length; w++) {
                        //check only addition elements in servedDrink
                        if (servedDrink[w][0] == "addition") {
                            //check if addition is the same as thisRecipe.addition[z]
                            if (servedDrink[w][1] == thisRecipe.addition[z]) {
                                //if entered here, then recipe ingredient is found in servedDrink
                                ingredientCheck = true;
                            }
                        }
                    }
                    //if ingredientChecked we modify resultsModal content with success
                    if (ingredientCheck == true) {
                        additionChecks += 1;
                        resultsModalContentHTML += `
                                                    <li>${document.getElementById(thisRecipe.addition[z]).firstElementChild.nextElementSibling.innerHTML}   <span class="badge badge-success"><i class="fa fa-check-circle" aria-hidden="true"></i></span></li>`;
                    }
                    //if ingredientChecked is false then we use danger
                    else {
                        additionUnchecked += 1;
                        resultsModalContentHTML += `
                                                    <li>${document.getElementById(thisRecipe.addition[z]).firstElementChild.nextElementSibling.innerHTML}   <span class="badge badge-danger"><i class="fa fa-times-circle" aria-hidden="true"></i></span></li>`;
                    }
                }
            }
            //else, if recipes has only one addition
            else {
                ingredientCheck = false;
                //check presence of ingredient in servedDrink
                for (let w = 0; w < servedDrink.length; w++) {
                    //check only addition elements in servedDrink
                    if (servedDrink[w][0] == "addition") {
                        //check if addition is the same as thisRecipe.addition[z]
                        if (servedDrink[w][1] == thisRecipe.addition) {
                            additionChecks += 1;
                            resultsModalContentHTML += `
                                                        <li>${document.getElementById(thisRecipe.addition).firstElementChild.nextElementSibling.innerHTML}  <span class="badge badge-success"><i class="fa fa-check-circle" aria-hidden="true"></i></span></li>`;
                            ingredientCheck = true;
                        }
                    }
                }
                if (ingredientCheck = false && typeof thisRecipe.addition !== "undefined") {
                    additionUnchecked += 1;
                    resultsModalContentHTML += `
                                                <li>${document.getElementById(thisRecipe.addition).firstElementChild.nextElementSibling.innerHTML}  <span class="badge badge-danger"><i class="fa fa-times-circle" aria-hidden="true"></i></span></li>`;
                }
            }
            //method element check
            //first, get button value to print in modal
            let methodButtonsDiv = document.getElementById('methodButtons').children;
            let methodName;
            ingredientCheck = false;
            for (let w = 0; w < methodButtonsDiv.length; w++) {
                if (methodButtonsDiv[w].value == thisRecipe.method) {
                    methodName = methodButtonsDiv[w].innerHTML;
                }
            }
            //now we check presence of method in servedDrink
            for (let w = 0; w < servedDrink.length; w++) {
                //check only method element in servedDrink
                if (servedDrink[w][0] == "method") {
                    //check if method is the same as thisRecipe.method[z]
                    if (servedDrink[w][1] == thisRecipe.method) {
                        methodChecks += 1;
                        //if entered here, then recipe ingredient is found in servedDrink
                        resultsModalContentHTML += `
                                                    <li>${methodName}  <span class="badge badge-success"><i class="fa fa-check-circle" aria-hidden="true"></i></span></li>`;
                        ingredientCheck = true;
                    }
                }
            }
            if (ingredientCheck == false) {
                methodUnchecked += 1;
                resultsModalContentHTML += `
                                            <li>${methodName}  <span class="badge badge-danger"><i class="fa fa-times-circle" aria-hidden="true"></i></span></li>`;
            }
            //now we check crystal in servedDrink
            //check presence of ingredient in servedDrink
            ingredientCheck = false;
            for (let w = 0; w < servedDrink.length; w++) {
                //check only crystal elements in servedDrink
                if (servedDrink[w][0] == "crystal") {
                    //check if base is the same as thisRecipe.addition[z]
                    if (servedDrink[w][1] == thisRecipe.crystal) {
                        crystalChecks += 1;
                        resultsModalContentHTML += `
                                                    <li>${document.getElementById(thisRecipe.crystal).firstElementChild.nextElementSibling.innerHTML}  <span class="badge badge-success"><i class="fa fa-check-circle" aria-hidden="true"></i></span></li>`;
                        ingredientCheck = true;
                    }
                }
            }
            if (ingredientCheck == false) {
                crystalUnchecked += 1;
                resultsModalContentHTML += `
                                            <li>${document.getElementById(thisRecipe.crystal).firstElementChild.nextElementSibling.innerHTML}  <span class="badge badge-danger"><i class="fa fa-times-circle" aria-hidden="true"></i></span></li>`;
            }
            //now we check ornaments
            //validate if recipe has more than 1 ornament element
            if (Array.isArray(thisRecipe.ornament) == true) {
                //cycle through all ornaments in recipe[j]
                for (let z = 0; z < thisRecipe.ornament.length; z++) {
                    ingredientCheck = false;
                    //now we check presence of ingredient in servedDrink
                    for (let w = 0; w < servedDrink.length; w++) {
                        //check only ornaments elements in servedDrink
                        if (servedDrink[w][0] == "ornament") {
                            //check if addition is the same as thisRecipe.addition[z]
                            if (servedDrink[w][1] == thisRecipe.ornament[z]) {
                                //if entered here, then recipe ingredient is found in servedDrink
                                ingredientCheck = true;
                            }
                        }
                    }
                    //if ingredientChecked we modify resultsModal content with success
                    if (ingredientCheck == true) {
                        ornamentChecks += 1;
                        resultsModalContentHTML += `
                                                    <li>${document.getElementById(thisRecipe.ornament[z]).firstElementChild.nextElementSibling.innerHTML}   <span class="badge badge-success"><i class="fa fa-check-circle" aria-hidden="true"></i></span></li>`;
                    }
                    //if ingredientChecked is false then we use danger
                    else {
                        ornamentUnchecked += 1;
                        resultsModalContentHTML += `
                                                    <li>${document.getElementById(thisRecipe.ornament[z]).firstElementChild.nextElementSibling.innerHTML}   <span class="badge badge-danger"><i class="fa fa-times-circle" aria-hidden="true"></i></span></li>`;
                    }
                }
            }
            //else, if recipes has only one ornament
            else {
                //check presence of ingredient in servedDrink
                ingredientCheck = false;
                for (let w = 0; w < servedDrink.length; w++) {
                    //check only ornament elements in servedDrink
                    if (servedDrink[w][0] == "ornament") {
                        //check if base is the same as thisRecipe.ornament[z]
                        if (servedDrink[w][1] == thisRecipe.ornament) {
                            ornamentChecks += 1;
                            resultsModalContentHTML += `
                                                        <li>${document.getElementById(thisRecipe.ornament).firstElementChild.nextElementSibling.innerHTML}  <span class="badge badge-success"><i class="fa fa-check-circle" aria-hidden="true"></i></span></li>`;
                            ingredientCheck = true;
                        }
                    }
                }
                if (ingredientCheck == false && typeof thisRecipe.ornament !== "undefined") {
                    ornamentUnchecked += 1;
                    resultsModalContentHTML += `
                                                <li>${document.getElementById(thisRecipe.ornament).firstElementChild.nextElementSibling.innerHTML}  <span class="badge badge-danger"><i class="fa fa-times-circle" aria-hidden="true"></i></span></li>`;
                }
            }
            //calculate total score
            let score = baseChecks + additionChecks + methodChecks + crystalChecks + ornamentChecks;
            let totalIngredients = score + baseUnchecked + additionUnchecked + methodUnchecked + crystalUnchecked + ornamentUnchecked;
            score /= totalIngredients;
            score *= 100;
            //now we finish and update content in resultsModal
            resultsModalContentHTML += `
                                          </ul>
                                        </div>
                                        <div class="col-4 text-center my-auto">
                                            <h4 class="mb-3">Resultado:</h4>
                                            <h2>${Math.round(score)}%</h2>
                                        </div> `;
            document.getElementById('resultsModal').parentElement.nextElementSibling.innerHTML = "";
            document.getElementById('resultsModal').parentElement.nextElementSibling.innerHTML = resultsModalContentHTML;
            //now we show results modal
            $('#resultsCentralModal').modal('show');
            //now we refresh inventory and load next recipe mixZone
            refreshInventory();
            //now we refresh mixZone
            //grab newCurrentDrink
            let newCurrentDrink;
            //cycle through table items
            let tableRows = document.getElementById('tableBody').children;
            for (let j = 0; j < tableRows.length; j += 2) {
                //check current drink row
                if (tableRows[j].firstElementChild.innerHTML == currentDrink) {
                    //fill row
                    tableRows[j].firstElementChild.nextElementSibling.innerHTML = Math.round(score) + "%";
                    //check if last row
                    if (j == tableRows.length - 2) {
                        newCurrentDrink = "finished";
                        //exit for
                        j = j + 2;
                    }
                    else {
                        let p = j + 2;
                        newCurrentDrink = tableRows[p].firstElementChild.innerHTML;
                    }
                }
            }
            //check newCurrentDrink
            if (newCurrentDrink == "finished") {
                //load testResultsModal with final score
                //create resultsTable results content
                let resultsTableHTML = `
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="text-left">Cocktail</th>
                                                    <th scope="col" class="text-center">Resultado</th>
                                                    <th scope="col" class="text-center">Pistas</th>
                                                </tr>
                                            </thead>
                                            <tbody id="resultsTableBody">`;
                //grab scoresTable
                let scoresTableDiv = document.getElementById('tableBody').children;
                //grab resultsTable
                let resultsTableDiv = document.getElementById('resultsTable');
                //write rows for table
                let finalScore = 0;
                let finalHints = 0;
                let divisor = 0;
                for (let j = 0; j < scoresTableDiv.length; j += 2) {
                    resultsTableHTML += `
                                        <tr>
                                            <td class="text-left">${scoresTableDiv[j].firstElementChild.innerHTML}</td>
                                            <td class="text-center">${scoresTableDiv[j].firstElementChild.nextElementSibling.innerHTML}</td>
                                            <td class="text-center">${scoresTableDiv[j].lastElementChild.innerHTML}</td>
                                        </tr>`;
                    finalScore = (finalScore * divisor + parseFloat(scoresTableDiv[j].firstElementChild.nextElementSibling.innerHTML)) / (divisor + 1);

                    if (scoresTableDiv[j].lastElementChild.innerHTML !== "") {
                        finalHints = (finalHints * divisor + parseFloat(scoresTableDiv[j].lastElementChild.innerHTML)) / (divisor + 1);
                    }
                    divisor += 1;
                }
                //add last row to table with final score
                resultsTableHTML += `
                                            <tr>
                                                <td class"text-left">Resultado final</td>
                                                <td>${Math.round(finalScore)}%</td>
                                                <td>${Math.round(finalHints)}%</td>
                                            </tr>
                                        </tbody>
                                    </table>`;
                //update content on table modal
                resultsTableDiv.innerHTML = resultsTableHTML;
                //add row and update scoresTable
                scoresTableDiv[0].parentElement.innerHTML += `
                                                            <tr>
                                                                <td class="text-left">Resultado final</td>
                                                                <td>${Math.round(finalScore)}%</td>
                                                                <td>${Math.round(finalHints)}%</td>
                                                            </tr>`;
                //$('#testResultsModal').show();
                //refresh page
                refreshInventory();
                let fakeRecipe = [""];
                refreshMixZone(fakeRecipe);
                //clear method and crystal divs
                $('#methodButtons').html("");
                $('#crystalIngredients').html("");
                //hide TestPanel first card
                $('#currentRecipeCard').hide('fade');
            }
            //if currentDrink wasnt last drink
            else {
                //refresh PanelTest
                //write name on cardHeader h4
                let recipeCard = document.getElementById('currentRecipeCard');
                recipeCard.firstElementChild.firstElementChild.innerHTML = newCurrentDrink;
                //grab thisRecipe for newCurrentDrink
                for (let j = 0; j < recipes.length; j++) {
                    //find recipe for newCurrentDrink
                    if (recipes[j].name == newCurrentDrink) {
                        thisRecipe = recipes[j];
                    }
                }
                //refresh mixZone
                refreshMixZone(thisRecipe);
            }
        }
    };
    xhttp.open("GET", "/JSON/cocktailRecipes.json", true);
    xhttp.send();

}

//refreshes inventory items
function refreshInventory() {
    $("#inventoryItems").html("");
    //new xmlhttprequest
    let xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //get response text
            let docResponse = JSON.parse(xhttp.responseText);
            //inventoryItemsColl has inventoryItem as js objects
            let inventoryItemsColl = docResponse.inventoryItem;
            let inventoryItemsHTML = "";
            for (let i = 0; i < inventoryItemsColl.length; i++) {
                //here we create HTML content for inventory items
                inventoryItemsHTML += `<div id="${inventoryItemsColl[i].id}" class="inventoryItem text-center ${inventoryItemsColl[i].type}" draggable="true" ondragstart="dragstartHandler(event)" ondragend="dragendHandler(event)">
                    <div class="col-12 pt-1" draggable="false">
                        <img src="${inventoryItemsColl[i].imgPath}" alt="${inventoryItemsColl[i].name}" draggable="false" />
                    </div>
                    <p draggable="false">${inventoryItemsColl[i].name}</p></div>`
            }
            //we now input HTML in #inventoryItems div
            //console.log(inventoryItemsHTML);
            $("#inventoryItems").html(inventoryItemsHTML);
        }
    };
    xhttp.open("GET", "/JSON/inventoryItems.json", true);
    xhttp.send();
}

//refreshes mixZone
function refreshMixZone(recipeObject) {
    //empty baseIngredients
    $('#baseIngredients').html("");
    //verify base is not null
    if (typeof recipeObject.base !== "undefined") {

        let baseDivs = "";
        //select first recipe bases
        let baseArray = recipeObject.base;
        //verify if it is one or more bases
        if (Array.isArray(baseArray) == true) {
            //if more than one base, create as many base ingredient divs
            for (let i = 1; i <= baseArray.length; i++) {
                baseDivs += `<div class="ingredient base" ondragover="dragoverHandler(event)" ondragleave="dragleaveHandler(event)" ondrop="dropHandler(event)"></div>`;
            }
        } else {
            //if only one base, create only one base ingredient div
            baseDivs += `<div class="ingredient base" ondragover="dragoverHandler(event)" ondragleave="dragleaveHandler(event)" ondrop="dropHandler(event)"></div>`;
        }
        $('#baseIngredients').html(baseDivs);
    }
    //empty additionIngredients
    $('#additionIngredients').html("");
    //verify addition is not null
    if (typeof recipeObject.addition !== "undefined") {
        let additionDivs = "";
        //select first recipe additions
        let additionArray = recipeObject.addition;
        //verify if it is one or more additions
        if (Array.isArray(additionArray) == true) {
            //if more than one addition, create as many addition ingredient divs
            for (let i = 1; i <= additionArray.length; i++) {
                additionDivs += `<div class="ingredient addition" ondragover="dragoverHandler(event)" ondragleave="dragleaveHandler(event)" ondrop="dropHandler(event)"></div>`;
            }
        }
        else {
            //if only one addition, create one addition ingredient div
            additionDivs += `<div class="ingredient addition" ondragover="dragoverHandler(event)" ondragleave="dragleaveHandler(event)" ondrop="dropHandler(event)"></div>`;
        }
        $('#additionIngredients').html(additionDivs);
    }
    //empty ornamentIngredients
    $('#ornamentIngredients').html("");
    //verify ornament is not null
    if (typeof recipeObject.ornament !== "undefined") {

        let ornamentDivs = "";
        //select ornaments for first recipe
        let ornamentArray = recipeObject.ornament;
        //verify if one or more ornaments
        if (Array.isArray(ornamentArray) == true) {
            //if more than one ornament, create as many ornament ingredient divs
            for (let i = 1; i <= ornamentArray.length; i++) {
                ornamentDivs += `<div class="ingredient ornament" ondragover="dragoverHandler(event)" ondragleave="dragleaveHandler(event)" ondrop="dropHandler(event)"></div>`;
            }
        }
        else {
            //if only one ornament, create one ornament ingredient div
            ornamentDivs += `<div class="ingredient ornament" ondragover="dragoverHandler(event)" ondragleave="dragleaveHandler(event)" ondrop="dropHandler(event)"></div>`;
        }
        $('#ornamentIngredients').html(ornamentDivs);
    }
    //methodZone
    $('#methodButtons').html("");
    let methodHTML = `
        <button class="btn btn-primary" type="button" onclick="activateBtn(event)" value="shaken">Agitado</button>
        <button class="btn btn-primary" type="button" onclick="activateBtn(event)" value="refreshed">Refrescado</button>
        <button class="btn btn-primary" type="button" onclick="activateBtn(event)" value="direct">Construido o directo</button>
        <button class="btn btn-primary" type="button" onclick="activateBtn(event)" value="doubleFiltered">Doble colado</button>
        <button class="btn btn-primary" type="button" onclick="activateBtn(event)" value="frozen">Granizado</button>`;
    $('#methodButtons').html(methodHTML);
    //crystalZone
    $('#crystalIngredients').html("");
    let crystalDiv = `
        <div class="ingredient crystal" ondragover="dragoverHandler(event)" ondragleave="dragleaveHandler(event)" ondrop="dropHandler(event)"></div>`
    $('#crystalIngredients').html(crystalDiv);
}