function moveToAbsolutePositionUsingSpread(x, y) {
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

    // Calculate the new position relative to the spread's top left corner
    // Ensure that the object is associated with a page and thus a spread
    if (!myObject.parentPage) {
        alert("The object is not associated with a page and thus a spread.");
        return;
    }
    var spreadBounds = myObject.parentPage.parentSpread.resolve(AnchorPoint.TOP_LEFT_ANCHOR, CoordinateSpaces.SPREAD_COORDINATES);
    var newPosition = [y - spreadBounds[0], x - spreadBounds[1]];

    // Move the object to the new position in the spread's coordinate space
    myObject.move(CoordinateSpaces.SPREAD_COORDINATES, newPosition);
}

// Move the selected object to an absolute position (100, 100) using spread coordinates
moveToAbsolutePositionUsingSpread(100, 100);
