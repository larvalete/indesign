function moveObjectToAbsolutePosition(anchorNumpad, newX, newY) {
    var anchorPoints = [
        AnchorPoint.TOP_LEFT_ANCHOR,       // Numpad 7
        AnchorPoint.TOP_CENTER_ANCHOR,     // Numpad 8
        AnchorPoint.TOP_RIGHT_ANCHOR,      // Numpad 9
        AnchorPoint.LEFT_CENTER_ANCHOR,    // Numpad 4
        AnchorPoint.CENTER_ANCHOR,         // Numpad 5
        AnchorPoint.RIGHT_CENTER_ANCHOR,   // Numpad 6
        AnchorPoint.BOTTOM_LEFT_ANCHOR,    // Numpad 1
        AnchorPoint.BOTTOM_CENTER_ANCHOR,  // Numpad 2
        AnchorPoint.BOTTOM_RIGHT_ANCHOR    // Numpad 3
    ];

    var myDocument = app.activeDocument;
    var mySelection = myDocument.selection;

    // Check if something is selected
    if (mySelection.length === 0) {
        alert("No object is selected. Please select an object and try again.");
        return;
    }

    // Check if the selected object is a rectangle (or frame) and not locked
    var myRectangle = mySelection[0];
    if (!(myRectangle instanceof Rectangle) || myRectangle.locked) {
        alert("The selected object is not a movable rectangle or it is locked.");
        return;
    }

    // Ensure the anchorNumpad is within the valid range
    if(anchorNumpad < 1 || anchorNumpad > 9) {
        alert("Invalid anchor number. Please choose a number from 1 to 9.");
        return;
    }

    // Get the current geometric bounds of the rectangle
    var currentBounds = myRectangle.geometricBounds; // [y1, x1, y2, x2]
    var height = currentBounds[2] - currentBounds[0];
    var width = currentBounds[3] - currentBounds[1];

   // Calculate new bounds based on the selected anchor point
var newBounds;
switch (anchorNumpad) {
    case 7: // TOP_LEFT_ANCHOR
        newBounds = [newY, newX, newY + height, newX + width];
        break;
    case 8: // TOP_CENTER_ANCHOR
        newBounds = [newY, newX - width / 2, newY + height, newX + width / 2];
        break;
    case 9: // TOP_RIGHT_ANCHOR
        newBounds = [newY, newX - width, newY + height, newX];
        break;
    case 4: // LEFT_CENTER_ANCHOR
        newBounds = [newY - height / 2, newX, newY + height / 2, newX + width];
        break;
    case 5: // CENTER_ANCHOR
        newBounds = [newY - height / 2, newX - width / 2, newY + height / 2, newX + width / 2];
        break;
    case 6: // RIGHT_CENTER_ANCHOR
        newBounds = [newY - height / 2, newX - width, newY + height / 2, newX];
        break;
    case 1: // BOTTOM_LEFT_ANCHOR
        newBounds = [newY - height, newX, newY, newX + width];
        break;
    case 2: // BOTTOM_CENTER_ANCHOR
        newBounds = [newY - height, newX - width / 2, newY, newX + width / 2];
        break;
    case 3: // BOTTOM_RIGHT_ANCHOR
        newBounds = [newY - height, newX - width, newY, newX];
        break;
    default:
        alert("Invalid anchor point number.");
        return;
}


    // Set the geometric bounds to the new position
    myRectangle.geometricBounds = newBounds;
}

// Example usage: Move the selected rectangle so that its top-left corner (anchor point 7) is at position (x: 348.5, y: 20) in points
moveObjectToAbsolutePosition(7, 348.5, 20);
