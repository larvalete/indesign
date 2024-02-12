function moveSelectedObjectToAbsolutePagePositionWithAnchor(x, y, anchorNumpad) {
    var anchorPoints = [
        [0, 0], // Placeholder for 0 to align index with numpad
        [1, 0], // 1 - Bottom Left
        [1, 0.5], // 2 - Bottom Center
        [1, 1], // 3 - Bottom Right
        [0.5, 0], // 4 - Middle Left
        [0.5, 0.5], // 5 - Center
        [0.5, 1], // 6 - Middle Right
        [0, 0], // 7 - Top Left
        [0, 0.5], // 8 - Top Center
        [0, 1] // 9 - Top Right
    ];

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

    // Validate anchorNumpad selection
    if (anchorNumpad < 1 || anchorNumpad > 9) {
        alert("Invalid anchor point selection. Please select a number from 1 to 9.");
        return;
    }

    // Get the object's bounds and calculate its dimensions
    var objectBounds = myObject.geometricBounds; // [y1, x1, y2, x2]
    var objectWidth = objectBounds[3] - objectBounds[1];
    var objectHeight = objectBounds[2] - objectBounds[0];

    // Calculate the object's new position based on the selected anchor point
    var anchorPoint = anchorPoints[anchorNumpad];
    var adjustedX = x - (objectWidth * anchorPoint[1]);
    var adjustedY = y - (objectHeight * anchorPoint[0]);

    // Move the object to the new position using page coordinates
    myObject.move([adjustedY, adjustedX]);
}

// Example usage: Move the selected object so that its bottom-left corner (anchor point 1) is at position (100, 100) on the page
moveSelectedObjectToAbsolutePagePositionWithAnchor(100, 100, 1);
