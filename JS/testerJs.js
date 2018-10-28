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
    //check if selection is "all" as in filter none, or view all items
    if (selection.val() == "all") {
        //cycle through items
        for (let i = 0; i < inventoryItems.length; i++) {
            //show items
            console.log("selected all");
            if (inventoryItems[i].classList.contains("d-none") == true) {
                inventoryItems[i].classList.remove("d-none");
            }
        }
    } else {
        //cycle through items to see if they belong to selected class to view
        for (let i = 0; i < inventoryItems.length; i++) {
            //checks id value to ignore items with empty id
            if (inventoryItems[i].id !== "") {
                //check if selected class is found in item classlist
                if (inventoryItems[i].classList.contains(selection.val()) == true) {
                    if (inventoryItems[i].classList.contains("d-none") == true) {
                        //if hidden, unhide
                        inventoryItems[i].classList.remove("d-none");
                    }
                } else {
                    //item not relevant for desired view, filtered item
                    if (inventoryItems[i].classList.contains("d-none") == false) {
                        //if not hidden, hide
                        inventoryItems[i].classList.add("d-none");
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