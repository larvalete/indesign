function moveObjectToAbsolutePositionByNumpad(anchorNumpad, newX, newY) {
    var myDocument = app.activeDocument;
    var mySelection = myDocument.selection;

    // Check if something is selected
    if (mySelection.length === 0 || !(mySelection[0] instanceof Rectangle)) {
        alert("No rectangle is selected. Please select a rectangle and try again.");
        return;
    }

    var myRectangle = mySelection[0];

    // Check if the rectangle is locked or on a locked layer
    if (myRectangle.locked || myRectangle.itemLayer.locked) {
        alert("The selected rectangle or its layer is locked. Please unlock and try again.");
        return;
    }

    // Get the current geometric bounds of the rectangle
    var currentBounds = myRectangle.geometricBounds; // [y1, x1, y2, x2]
    var currentWidth = currentBounds[3] - currentBounds[1];
    var currentHeight = currentBounds[2] - currentBounds[0];
    
    // Determine the new top-left position based on the anchor point
    var newTopLeftY, newTopLeftX;
    switch(anchorNumpad) {
        case 7: // TOP_LEFT_ANCHOR
            newTopLeftX = newX;
            newTopLeftY = newY;
            break;
        case 8: // TOP_CENTER_ANCHOR
            newTopLeftX = newX - currentWidth / 2;
            newTopLeftY = newY;
            break;
        case 9: // TOP_RIGHT_ANCHOR
            newTopLeftX = newX - currentWidth;
            newTopLeftY = newY;
            break;
        // ... handle other cases similarly
        default:
            alert("Invalid numpad number. Please choose a number from 1 to 9.");
            return;
    }

    // Move the rectangle to the new position
    myRectangle.move([newTopLeftY, newTopLeftX]);
}

// Example usage:
// Move the selected rectangle so that its top-left corner is at position (348.5, 20) in points
moveObjectToAbsolutePositionByNumpad(7, 348.5, 20);
