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

    // Convert from mm to points (if your document uses mm as units)
    // newX = newX * 2.83464567;
    // newY = newY * 2.83464567;

    // Determine the offset based on the selected anchor point
    var offset = getOffsetForAnchor(myRectangle, anchorNumpad, newX, newY);

    if (offset) {
        // Move the rectangle to the new position
        myRectangle.move([offset.y, offset.x]);
    } else {
        alert("Invalid anchor point number. Please choose a number from 1 to 9.");
    }
}

function getOffsetForAnchor(rectangle, anchorNumpad, newX, newY) {
    var bounds = rectangle.geometricBounds; // [y1, x1, y2, x2]
    var width = bounds[3] - bounds[1];
    var height = bounds[2] - bounds[0];
    var offset = { x: 0, y: 0 };

    switch(anchorNumpad) {
        case 7: // TOP_LEFT_ANCHOR
            offset.x = newX - bounds[1];
            offset.y = newY - bounds[0];
            break;
        case 8: // TOP_CENTER_ANCHOR
            offset.x = newX - (bounds[1] + width / 2);
            offset.y = newY - bounds[0];
            break;
        case 9: // TOP_RIGHT_ANCHOR
            offset.x = newX - bounds[3];
            offset.y = newY - bounds[0];
            break;
        // ... handle other cases similarly
        default:
            return null; // Invalid anchor point number
    }

    return offset;
}

// Example usage:
// Move the selected rectangle so that its top-left corner is at position (x: 348.5, y: 20) in points
moveObjectToAbsolutePositionByNumpad(7, 348.5, 20);
