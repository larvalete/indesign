function moveSelectedObjectToAbsolutePosition(newX, newY) {
    var myDocument = app.activeDocument;
    var mySelection = myDocument.selection;
    
    if (mySelection.length === 0) {
        alert("No object is selected. Please select an object and try again.");
        return;
    }

    var myObject = mySelection[0];

    if (myObject.locked || myObject.itemLayer.locked) {
        alert("The selected object is locked. Please unlock it and try again.");
        return;
    }

    // Get the object's current position in the spread coordinates
    var currentLocation = myObject.resolve(AnchorPoint.TOP_LEFT_ANCHOR, CoordinateSpaces.SPREAD_COORDINATES);
    
    // Spread coordinates return an array of arrays. We're interested in the first set.
    var currentX = currentLocation[0][0];
    var currentY = currentLocation[0][1];

    // If the object is already at the target location, exit the function
    if (Math.abs(currentX - newX) < 0.001 && Math.abs(currentY - newY) < 0.001) {
        alert("The object is already at the desired location.");
        return;
    }

    // Calculate the amount to move the object by
    var deltaX = newX - currentX;
    var deltaY = newY - currentY;

    // Move the object
    myObject.move(CoordinateSpaces.SPREAD_COORDINATES, [deltaY, deltaX]);
}

// Use the function to move the selected object to the specified location
moveSelectedObjectToAbsolutePosition(100, 100);
