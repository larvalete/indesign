// Main function to apply proportional scaling to the selected frame
function applyProportionalScaling() {
    // Ensure there is a selection and it is the correct object type
    if (app.selection.length === 0 || !(app.selection[0] instanceof Rectangle)) {
        alert("Please select a rectangle frame and run the script again.");
        return;
    }

    var frame = app.selection[0];
    var targetWidthPt = 92.5; // The target width in points, assuming points are the document's default unit

    // Calculate the current width and the scale factor
    var currentWidth = frame.geometricBounds[3] - frame.geometricBounds[1];
    var scaleFactor = targetWidthPt / currentWidth; 

    // Check for a legal scale factor
    if (scaleFactor <= 0 || !isFinite(scaleFactor)) {
        alert("Illegal scale factor: " + scaleFactor);
        return;
    }

    // Apply the proportional scaling transformation
    try {
        frame.resize(
            CoordinateSpaces.INNER_COORDINATES,
            AnchorPoint.CENTER_ANCHOR,
            ResizeMethods.REPLACING_CURRENT_DIMENSIONS_WITH,
            [scaleFactor, scaleFactor],
            true, // Transform content
            true, // Transform strokes
            true  // Transform proportions
        );
    } catch (e) {
        alert("An error occurred: " + e.toString());
    }
}

// Run the script
applyProportionalScaling();
