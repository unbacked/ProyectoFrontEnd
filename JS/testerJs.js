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
});

//handles test start
function startTest(ev) {
    //hide div with start test button
    let divToHide = ev.target.parentElement;
    divToHide.hidden = true;
    //validate if user is logged in
    //if not logged in, show div 2 for login/register and end function

    //if logged in, proceed
    //import recipes from JSON file (meanwhile we use created objects here)
    let recipes = [
        {
            "name": "Cuba Libre",
            "base": "rum",
            "addition": ["lemonJuice", "coke"],
            "method": "direct",
            "crystal": "collinsGlass",
            "ornament": "lemonSlice",
            "hint": "Cuba es famosa por haber producido grandes cantidades de caña de azúcar en el pasado. La ironía consiste en unir el alcohol nacional con la bebida más emblemática del imperio en un vaso gringo para cocteles."
        },
        {
            "name": "Frozen Margarita",
            "base": ["tequila", "tripleSec"],
            "addition": "lemonJuice",
            "method": "frozen",
            "crystal": "margaritaGlass",
            "ornament": ["sugarFrost", "lemonSlice"],
            "hint": "Margarita con M de México. Mezcla un alcohol 'caliente' con mucho hielo, servido en una copa con su nombre, adornado como un trago que te brindaría Tony Montana."
        },
        {
            "name": "Cocuy Tonic",
            "base": "cocuy",
            "addition": "tonicWater",
            "method": "direct",
            "crystal": "collinsGlass",
            "ornament": "lemonSlice",
            "hint": "Muy obvio por el nombre... no entiendo cómo hizo falta la pista! El vaso es gringo y para cocteles."
        },
        {
            "name": "Trinidad",
            "base": "rum",
            "addition": ["angostura", "lemonJuice", "coke"],
            "method": "direct",
            "crystal": "collingGlass",
            "ornament": "lemonSlice",
            "hint": "Pareciera llamarse Trinidad por el trío de acompañantes, comunes en tragos cuyos nombres hacen referencia a Islas del Caribe."
        },
        {
            "name": "Caipirinha",
            "base": "cachaza",
            "addition": ["lemonJuice", "sugar"],
            "method": "direct",
            "crystal": "oldFashionedGlass",
            "hint": "Al grano, brasilero, tradicional; ácido y dulce."
        },
        {
            "name": "Larita",
            "base": ["cocuy", "tripleSec"],
            "addition": "lemonJuice",
            "method": "shaken",
            "crystal": "margaritaGlass",
            "ornament": ["sugarFrost", "lemonSlice"],
            "hint": "Larita debe ser un trago venezolano. Algo así como agarrar un equivalente nacional del agave y arMAR-GARITA-rlo."
        },
        {
            "name": "Long Island Ice-Tea",
            "base": ["whiteRum", "vodka", "gin", "whiteTequila", "tripleSec"],
            "addition": ["coke", "lemonJuice"],
            "method": "direct",
            "crystal": "tumblerGlass",
            "ornament": "lemonSlice",
            "hint": "Puros alcoholes blancos en un vaso de té frío. Sin té, pero igual oscuro."
        },
        {
            "name": "Dry Martini",
            "base": ["gin", "dryVermouth"],
            "method": "refreshed",
            "crystal": "martiniGlass",
            "ornament": "olives",
            "hint": "Por Dios. No debes haber visto una película jamás. Es el trago de la aceituna. Servido sin hielo... en una copita con su nombre... joder."
        },
        {
            "name": "Vodka Martini",
            "base": ["vodka", "dryVermouth"],
            "method": "refreshed",
            "crystal": "martiniGlass",
            "ornament": "lemonTwist",
            "hint": "Con vodka en vez de ginebra. ¿Cómo se pierden puntos en una tan fácil?"
        }
    ];
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
    console.log(selectedRecipes[0]);
    //verify base is not null
    if (selectedRecipes[0].base !== null) {
        //empty baseIngredients
        $('#baseIngredients').html("");
        let baseDivs = "";
        //select first recipe bases
        let baseArray = selectedRecipes[0].base;
        //verify if it is one or more bases
        if (Array.isArray(baseArray) == true) {
            //if more than one base, create as many base ingredient divs
            for (let i = 1; i <= baseArray.length; i++) {
                baseDivs += `<div class="ingredient base" ondragover="dragoverHandler(event)" ondragleave="dragleaveHandler(event)" ondrop="dropHandler(event)"></div>`;
            }
            console.log(baseArray.length);
        } else {
            //if only one base, create only one base ingredient div
            baseDivs += `<div class="ingredient base" ondragover="dragoverHandler(event)" ondragleave="dragleaveHandler(event)" ondrop="dropHandler(event)"></div>`;
            console.log("1");
        }
        $('#baseIngredients').html(baseDivs);
    }
    //verify addition is not null
    if (selectedRecipes[0].addition !== null) {
        //empty additionIngredients
        $('#additionIngredients').html("");
        let additionDivs = "";
        //select first recipe additions
        let additionArray = selectedRecipes[0].addition;
        //verify if it is one or more additions
        if (Array.isArray(additionArray) == true) {
            //if more than one addition, create as many addition ingredient divs
            for (let i = 1; i <= additionArray.length; i++) {
                additionDivs += `<div class="ingredient addition" ondragover="dragoverHandler(event)" ondragleave="dragleaveHandler(event)" ondrop="dropHandler(event)"></div>`;
            }
            console.log(additionArray.length);
        }
        else {
            //if only one addition, create one addition ingredient div
            additionDivs += `<div class="ingredient addition" ondragover="dragoverHandler(event)" ondragleave="dragleaveHandler(event)" ondrop="dropHandler(event)"></div>`;
            console.log("1");
        }
        $('#additionIngredients').html(additionDivs);
    }
    //verify ornament is not null
    if (selectedRecipes[0].ornament !== null) {
        //empty ornamentIngredients
        $('#ornamentIngredients').html("");
        let ornamentDivs = "";
        //select ornaments for first recipe
        let ornamentArray = selectedRecipes[0].ornament;
        //verify if one or more ornaments
        if (Array.isArray(ornamentArray) == true) {
            //if more than one ornament, create as many ornament ingredient divs
            for (let i = 1; i <= ornamentArray.length; i++) {
                ornamentDivs += `<div class="ingredient ornament" ondragover="dragoverHandler(event)" ondragleave="dragleaveHandler(event)" ondrop="dropHandler(event)"></div>`;
            }
            console.log(ornamentArray.length);
        }
        else {
            //if only one ornament, create one ornament ingredient div
            ornamentDivs += `<div class="ingredient ornament" ondragover="dragoverHandler(event)" ondragleave="dragleaveHandler(event)" ondrop="dropHandler(event)"></div>`;
            console.log("1");
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
    //fill up testResults zone
    //write name on cardHeader h4
    let recipeCard = document.getElementById('currentRecipeCard');
    console.log(recipeCard.id);
    recipeCard.firstElementChild.firstElementChild.innerHTML = "Preparando un " + selectedRecipes[0].name + "!";
    //write clue on clues modal

    //write userName on cardHeader h4
    let userNameCard = document.getElementById('userTestScores');
    userNameCard.firstElementChild.firstElementChild.innerHTML = "Resultados de nombreUsuario";
    //write table with scores on tableBody
    //build tableBody html
    let tableBodyHTML = "";
    //cycle through all selectedRecipes
    for (let i = 0; i < selectedRecipes.length; i++) {
        tableBodyHTML += `
            <tr><td scope="row" class="text-left">${selectedRecipes[i].name}</td>
                <td></td>
                <td></td>
            <tr>`;
    }
    document.getElementById('tableBody').innerHTML = tableBodyHTML;
    //update hintModal content
    let hintModal = document.getElementById('hintsModal').parentElement.nextElementSibling;
    hintModal.firstElementChild.innerHTML = selectedRecipes[0].hint;


}