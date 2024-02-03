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

    // Get the current geometric bounds of the object
    var currentBounds = myObject.geometricBounds; // [y1, x1, y2, x2]
    var currentX = currentBounds[1];
    var currentY = currentBounds[0];

    // Calculate the movement required to get to the new position
    var deltaX = newX - currentX;
    var deltaY = newY - currentY;

    // Move the object
    myObject.move(undefined, [deltaY, deltaX]);
}

// Move the selected object so that the top-left corner is at position (100, 100) in points
moveSelectedObjectToAbsolutePosition(100, 100);
