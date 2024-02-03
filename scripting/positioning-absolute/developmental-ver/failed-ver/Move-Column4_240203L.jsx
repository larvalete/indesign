function moveToAbsolutePositionIfNeeded(x, y) {
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

    // Assuming the object's parent is a page, we get the page's bounds
    // This is necessary to convert the desired position to the parent page's coordinate space
    var parentPage = myObject.parentPage;
    if (!parentPage) {
        alert("The object is not placed on a page.");
        return;
    }
    var pageBounds = parentPage.bounds; // [y1, x1, y2, x2]

    // Convert desired position to page coordinates
    var desiredPositionOnPage = [y - pageBounds[0], x - pageBounds[1]];

    // Get the object's current position in page coordinates
    var currentPosition = myObject.resolve(AnchorPoint.TOP_LEFT_ANCHOR, CoordinateSpaces.PARENT_COORDINATES);
    var currentX = currentPosition[0][1];
    var currentY = currentPosition[0][0];

    // Check if the object is already at the desired position
    if (Math.abs(currentX - desiredPositionOnPage[1]) < 1 && Math.abs(currentY - desiredPositionOnPage[0]) < 1) {
        alert("The object is already at the desired position.");
        return;
    }

    // Move the object to the desired position
    myObject.move(CoordinateSpaces.PARENT_COORDINATES, desiredPositionOnPage);
}

// Example usage: Move the selected object so that its top-left corner is at position (100, 100) in points
moveToAbsolutePositionIfNeeded(100, 100);
