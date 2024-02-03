function moveObjectToAbsolutePositionByNumpad(anchorNumpad, newX, newY) {
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

    // Get the current InDesign document and the first selected item
    var myDocument = app.activeDocument;
    var mySelection = myDocument.selection;

    // Check if something is selected
    if (mySelection.length === 0) {
        alert("No object is selected. Please select a frame and try again.");
        return;
    }

    // Check if the selected object is the right type and not locked
    var myObject = mySelection[0];
    if (myObject.locked || myObject.itemLayer.locked || !myObject.hasOwnProperty('geometricBounds')) {
        alert("The selected object is either locked or not a movable frame. Please select a movable frame and ensure it is not locked.");
        return;
    }

    // Ensure the anchorNumpad is within the valid range
    if(anchorNumpad < 1 || anchorNumpad > 9) {
        alert("Invalid numpad number. Please choose a number from 1 to 9.");
        return;
    }

    // Calculate the new geometric bounds based on the anchor point
    var currentBounds = myObject.geometricBounds; // [y1, x1, y2, x2]
    var currentWidth = currentBounds[3] - currentBounds[1];
    var currentHeight = currentBounds[2] - currentBounds[0];

    var newBounds = [
        newY, // top
        newX, // left
        newY + currentHeight, // bottom
        newX + currentWidth // right
    ];

    // Set the object's new geometric bounds to move it to the absolute position
    myObject.geometricBounds = newBounds;
}

// Example usage: Move the selected object to an absolute position of 348.5pt x 20pt using the top left corner as the anchor
moveObjectToAbsolutePositionByNumpad(7, 348.5, 20);
