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

function filter() {
    //grab select tag
    let selection = $("select");
    //grab inventoryItems collection
    let inventoryItems = document.getElementsByClassName("inventoryItem");
    //console.log(inventoryItems);
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
            //alert(selection.val());
            //checks id value to ignore items with empty id
            if (inventoryItems[i].id !== "") {
                //console.log(inventoryItems[i].id);
                //if (item.classList.contains("d-none") == false) {
                //    console.log(item.id);
                //}
                //alert(inventoryItems[i].className);
                //check if selected class is found in item classlist
                if (inventoryItems[i].classList.contains(selection.val()) == true) {
                    if (inventoryItems[i].classList.contains("d-none") == true) {
                        //if hidden, unhide
                        inventoryItems[i].classList.remove("d-none");
                        //item.style.display = "block";
                    }
                } else {
                    //item not relevant for desired view, filtered item
                    //console.log("match " + inventoryItems[i].id + " and " + item.style.display);
                    if (inventoryItems[i].classList.contains("d-none") == false) {
                        //if not hidden, hide
                        inventoryItems[i].classList.add("d-none");
                    }
                }
            }

        }
    }

}



$('#inventoryItems').bind('wheel', function (e) {
    e.preventDefault();
    this.scrollLeft += (25 * e.originalEvent.deltaY);
    //e.preventDefault();
    //alert(e.originalEvent.deltaY);
    //if (e.originalEvent.deltaY > 0) {
    //    alert('va hacia la derecha');
    //    this.scrollLeft -= (30*e.originalEvent.deltaY);
    //}
    //else {
    //    alert('va hacia la izquierda');
    //    this.scrollLeft = (30*e.originalEvent.deltaY);
    //}

})

// make container container fluid when screen width is less than 959px