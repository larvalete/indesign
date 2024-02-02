// Function to proportionally scale the frame's width
function scaleFrameWidthProportionally(frame, targetWidthPt) {
    // Get the current width and height of the frame in points
    var currentWidth = frame.geometricBounds[3] - frame.geometricBounds[1];
    var currentHeight = frame.geometricBounds[2] - frame.geometricBounds[0];

    // Calculate the scale factor
    var scaleFactor = targetWidthPt / currentWidth;

    // Check if scaleFactor is legal before applying transformation
    if (scaleFactor <= 0 || !isFinite(scaleFactor)) {
        alert("The scale factor is not legal: " + scaleFactor);
        return;
    }

    // Apply the proportional scaling transformation
    frame.transform(
        CoordinateSpaces.INNER_COORDINATES,
        AnchorPoint.CENTER_ANCHOR,
        [scaleFactor, scaleFactor],
        undefined,
        true,
        true,
        true
    );
}

// Main function to apply the proportional scaling
function applyProportionalScaling() {
    // Ensure there is a selection and it is the correct object type
    if (app.selection.length === 0 || !(app.selection[0] instanceof Rectangle)) {
        alert("No rectangle frame selected. Please select a frame and run the script again.");
        return;
    }

    // The target width to scale to in points
    var targetWidthPt = 92.5; 

    // Call the scaling function with the selected frame and target width
    scaleFrameWidthProportionally(app.selection[0], targetWidthPt);
}

// Run the main script function
applyProportionalScaling();
