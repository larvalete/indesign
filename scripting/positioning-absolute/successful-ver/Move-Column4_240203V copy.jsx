function moveSelectedObjectToAbsolutePagePosition(x, y) {
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

    // Ensure the object is on a page
    if (!myObject.parentPage) {
        alert("The selected object is not on a page.");
        return;
    }

    // Get the page's bounds to use as a reference for the move
    var pageBounds = myObject.parentPage.bounds; // [y1, x1, y2, x2]
    
    // Calculate the object's new position based on the page's top-left corner
    var newPositionX = x - pageBounds[1];
    var newPositionY = y - pageBounds[0];

    // Move the object to the new position using page coordinates
    myObject.move([newPositionY, newPositionX]);
}

// Example usage: Move the selected object so that its top-left corner is at position (100, 100) on the page
moveSelectedObjectToAbsolutePagePosition(100, 100);
