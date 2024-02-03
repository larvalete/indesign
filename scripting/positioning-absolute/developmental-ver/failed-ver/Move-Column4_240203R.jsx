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

    // Calculate the new absolute position
    var myBounds = myObject.geometricBounds;
    var myCurrentX = myBounds[1];
    var myCurrentY = myBounds[0];
    
    var deltaX = newX - myCurrentX;
    var deltaY = newY - myCurrentY;

    // Check if the object is already at the new position
    if (Math.abs(deltaX) < 0.001 && Math.abs(deltaY) < 0.001) {
        // Object is already at the desired position, no need to move
        return;
    }
    
    // Move the object by the delta to reach the new position
    myObject.move(undefined, [deltaY, deltaX]);
}

// Example usage: Move the selected object so that its top-left corner is at position (100, 100) in points
moveSelectedObjectToAbsolutePosition(100, 100);
