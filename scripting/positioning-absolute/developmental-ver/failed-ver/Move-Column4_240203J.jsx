function moveObjectToAbsolutePosition(anchorNumpad, newX, newY) {
    var anchorPoints = [
        AnchorPoint.BOTTOM_LEFT_ANCHOR,    // Numpad 1
        AnchorPoint.BOTTOM_CENTER_ANCHOR,  // Numpad 2
        AnchorPoint.BOTTOM_RIGHT_ANCHOR,   // Numpad 3
        AnchorPoint.LEFT_CENTER_ANCHOR,    // Numpad 4
        AnchorPoint.CENTER_ANCHOR,         // Numpad 5
        AnchorPoint.RIGHT_CENTER_ANCHOR,   // Numpad 6
        AnchorPoint.TOP_LEFT_ANCHOR,       // Numpad 7
        AnchorPoint.TOP_CENTER_ANCHOR,     // Numpad 8
        AnchorPoint.TOP_RIGHT_ANCHOR       // Numpad 9
    ];

    var myDocument = app.activeDocument;
    var mySelection = myDocument.selection;

    // Check if something is selected
    if (mySelection.length === 0) {
        alert("No object is selected. Please select an object and try again.");
        return;
    }

    var myRectangle = mySelection[0];

    // Check if the rectangle is locked or on a locked layer
    if (myRectangle.locked || myRectangle.itemLayer.locked) {
        alert("The selected object is locked. Please unlock it and try again.");
        return;
    }

    // Ensure the anchorNumpad is within the valid range
    if(anchorNumpad < 1 || anchorNumpad > 9) {
        alert("Invalid anchor number. Please choose a number from 1 to 9.");
        return;
    }

    // Get the current position of the anchor point
    var anchorBounds = myRectangle.resolve(anchorPoints[anchorNumpad - 1], CoordinateSpaces.INNER_COORDINATES);
    var anchorY = anchorBounds[0][1];
    var anchorX = anchorBounds[0][0];

    // Calculate the difference between the current and new positions
    var deltaX = newX - anchorX;
    var deltaY = newY - anchorY;

    // Move the rectangle to the new position
    myRectangle.move(undefined, [deltaY, deltaX]);
}

// Example usage:
// Move the selected rectangle so that the top-left corner (anchor point 7) is at position (x: 348.5, y: 20) in points
moveObjectToAbsolutePosition(7, 348.5, 20);
