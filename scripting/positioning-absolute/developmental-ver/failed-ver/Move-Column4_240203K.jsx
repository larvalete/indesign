function moveSelectedObjectToAbsolutePosition(newX, newY) {
    var myDocument = app.activeDocument;
    var mySelection = myDocument.selection;
    
    if (mySelection.length === 0) {
        alert("No object is selected. Please select an object and try again.");
        return;
    }

    var myObject = mySelection[0];

    if (myObject.locked || myObject.itemLayer.locked) {
        alert("The selected object is locked. Please unlock it and try again.");
        return;
    }

    // Use page coordinates to get the bounds of the object
    var currentPage = myObject.parentPage;
    var pageBounds = currentPage.bounds; // Get the bounds of the page

    // If the object is not on a page (e.g., on the pasteboard), use the spread instead
    if (!currentPage) {
        alert("The object is not on a page. Using spread coordinates instead.");
        currentPage = myDocument.spreads.item(0); // Defaulting to the first spread
        pageBounds = currentPage.pages.item(0).bounds; // Bounds of the first page of the spread
    }

    // Move the object
    myObject.move([newY - pageBounds[0], newX - pageBounds[1]]);
}

// Move the selected object so that the top-left corner is at position (x: 100, y: 100) in points
moveSelectedObjectToAbsolutePosition(100, 100);
