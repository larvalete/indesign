function moveObjectToNewPositionByNumpad(anchorNumpad, newX, newY) {
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
        alert("No object is selected. Please select a frame and try again.");
        return;
    }
    
    var myRectangle = mySelection[0]; // Assume the first selected object is the target

    // Check if the selected object is a rectangle (or frame) and not locked
    if (!(myRectangle instanceof Rectangle) || myRectangle.locked) {
        alert("The selected object is not a movable frame or it is locked. Please select a movable frame and ensure it is not locked.");
        return;
    }

    // Ensure the anchorNumpad is within the valid range
    if(anchorNumpad < 1 || anchorNumpad > 9) {
        alert("Invalid numpad number. Please choose a number from 1 to 9.");
        return;
    }

    // Select the anchor point based on the provided numpad number
    var selectedAnchorPoint = anchorPoints[anchorNumpad - 1]; // Array is 0-based, so subtract 1

    // Create a transformation matrix for moving the rectangle
    var myTransformationMatrix = app.transformationMatrices.add({horizontalTranslation: newX, verticalTranslation: newY});

    // Apply the transformation matrix to the rectangle using the selected anchor point
    myRectangle.transform(CoordinateSpaces.PARENT_COORDINATES, selectedAnchorPoint, myTransformationMatrix);
}

// Example usage:
// To move the object with the bottom left anchor point (numpad 1), to position (100, 100)
moveObjectToNewPositionByNumpad(7, 348.5, 20);
