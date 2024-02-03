function moveToAbsolutePosition(x, y) {
    var myDocument = app.activeDocument;
    var mySelection = myDocument.selection;

    // Check if an object is selected
    if (mySelection.length === 0) {
        alert("No object is selected. Please select an object and try again.");
        return;
    }

    var myObject = mySelection[0];

    // Check if the object is locked or on a locked layer
    if (myObject.locked || myObject.itemLayer.locked) {
        alert("The selected object is locked. Please unlock it and try again.");
        return;
    }

    // Assuming the object's parent is a page, and we will move the object in relation to the page's coordinate space
    var parentPage = myObject.parentPage;
    if (!parentPage) {
        alert("The object is not on a page. Please place it on a page and try again.");
        return;
    }

    // Calculate the new position relative to the page's top left corner
    var pageBounds = parentPage.bounds; // [y1, x1, y2, x2], top-left and bottom-right corners of the page
    var newPosition = [y - pageBounds[0], x - pageBounds[1]];

    // Move the object to the new position
    myObject.move(CoordinateSpaces.PARENT_COORDINATES, newPosition);
}

// Move the selected object to an absolute position (100, 100)
moveToAbsolutePosition(100, 100);
