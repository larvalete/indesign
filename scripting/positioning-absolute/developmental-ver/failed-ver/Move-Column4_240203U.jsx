function moveSelectedObjectToAbsolutePosition(x, y) {
    var myDocument = app.activeDocument;
    var mySelection = myDocument.selection;
    
    // Make sure there's a selection
    if (mySelection.length === 0) {
        alert("No object is selected. Please select an object and try again.");
        return;
    }

    // Make sure the selection is not locked
    var myObject = mySelection[0];
    if (myObject.locked || myObject.itemLayer.locked) {
        alert("The selected object or its layer is locked. Please unlock and try again.");
        return;
    }

    // Convert the desired position to the parent spread's coordinate space
    var parentSpread = myObject.parentPage.parentSpread;
    var spreadBounds = parentSpread.resolve(AnchorPoint.TOP_LEFT_ANCHOR, CoordinateSpaces.SPREAD_COORDINATES);
    var spreadOriginX = spreadBounds[0][0];
    var spreadOriginY = spreadBounds[0][1];
    var newPositionX = x - spreadOriginX;
    var newPositionY = y - spreadOriginY;

    // Get the object's current position
    var currentBounds = myObject.resolve(AnchorPoint.TOP_LEFT_ANCHOR, CoordinateSpaces.SPREAD_COORDINATES);
    var currentX = currentBounds[0][0];
    var currentY = currentBounds[0][1];

    // Calculate the difference between the current and new positions
    var deltaX = newPositionX - currentX;
    var deltaY = newPositionY - currentY;

    // If the object isn't already at the desired position, move it
    if (Math.abs(deltaX) > 0.001 || Math.abs(deltaY) > 0.001) {
        myObject.move(CoordinateSpaces.SPREAD_COORDINATES, [deltaY, deltaX]);
    }
}

// Example usage: Move the selected object so that its top-left corner is at position (100, 100)
moveSelectedObjectToAbsolutePosition(100, 100);
