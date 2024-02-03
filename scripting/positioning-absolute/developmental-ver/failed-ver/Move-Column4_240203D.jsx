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

    // Ensure the anchorNumpad is within the valid range
    if (anchorNumpad < 1 || anchorNumpad > 9) {
        alert("Invalid numpad number. Please choose a number from 1 to 9.");
        return;
    }

    var myDocument = app.activeDocument;
    var mySelection = myDocument.selection;
    var myRectangle;

    // Check if something is selected
    if (mySelection.length === 0 || !(mySelection[0] instanceof Rectangle)) {
        alert("No rectangle is selected. Please select a rectangle and try again.");
        return;
    }

    myRectangle = mySelection[0];

    // Calculate the new position for the anchor point
    var anchorPosition = myRectangle.resolve(AnchorPoint.TOP_LEFT_ANCHOR, CoordinateSpaces.SPREAD_COORDINATES);
    var deltaX = newX - anchorPosition[0];
    var deltaY = newY - anchorPosition[1];

    // Move the rectangle to the new position based on the top-left anchor point
    myRectangle.move(undefined, [deltaX, deltaY]);
}

// Example usage:
// Move the selected rectangle so that its top-left corner is at position (348.5, 20) in points
moveObjectToAbsolutePositionByNumpad(7, 348.5, 20);
