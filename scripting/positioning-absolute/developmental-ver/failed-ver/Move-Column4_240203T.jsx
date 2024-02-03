function moveSelectedObjectToAbsolutePosition(targetX, targetY) {
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

    // Get the object's current bounds and calculate its current top-left position
    var currentBounds = myObject.geometricBounds; // [y1, x1, y2, x2]
    var currentTopLeftX = currentBounds[1];
    var currentTopLeftY = currentBounds[0];
    
    // Calculate the difference between the target position and the current position
    var deltaX = targetX - currentTopLeftX;
    var deltaY = targetY - currentTopLeftY;

    // If the object is not already at the target position, move it
    if (Math.abs(deltaX) > 0.001 || Math.abs(deltaY) > 0.001) {
        // Adjust the position by the delta
        myObject.move(undefined, [deltaY, deltaX]);
    } else {
        // The object is already at the target position, no need to move
        alert("The object is already at the target position.");
    }
}

// Move the selected object so that its top-left corner is at the position (100, 100) in points
moveSelectedObjectToAbsolutePosition(100, 100);
