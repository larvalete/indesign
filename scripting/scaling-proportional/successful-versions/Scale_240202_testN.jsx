// Main function to apply proportional scaling to the selected frame
function applyProportionalScaling() {
    // Ensure there is a selection and it is the correct object type
    if (app.selection.length === 0 || !(app.selection[0] instanceof Rectangle)) {
        alert("Please select a rectangle frame and run the script again.");
        return;
    }

    var frame = app.selection[0];
    var targetWidthPt = 92.5; // The target width in points

    // Calculate the current width in points
    var currentWidth = frame.geometricBounds[3] - frame.geometricBounds[1];

    // Ensure the current width is greater than the target width to reduce the size
    if (currentWidth <= targetWidthPt) {
        alert("Current width is already smaller than or equal to the target width.");
        return;
    }

    // Calculate the scale factor to reduce the size
    var scaleFactor = targetWidthPt / currentWidth;

    // Check for a legal scale factor (greater than 0 but less than 1 for reduction)
    if (scaleFactor <= 0 || scaleFactor >= 1 || !isFinite(scaleFactor)) {
        alert("Illegal scale factor: " + scaleFactor);
        return;
    }

    // Apply the proportional scaling transformation using a matrix
    try {
        // Create a transformation matrix for scaling
        var myMatrix = app.transformationMatrices.add({horizontalScaleFactor:scaleFactor, verticalScaleFactor:scaleFactor});

        // Apply the transformation matrix to the frame
        frame.transform(CoordinateSpaces.INNER_COORDINATES, AnchorPoint.CENTER_ANCHOR, myMatrix);
    } catch (e) {
        alert("An error occurred: " + e.toString());
    }
}

// Run the script
applyProportionalScaling();
