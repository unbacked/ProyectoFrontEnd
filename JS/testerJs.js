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