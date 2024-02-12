// Function to convert millimeters to points
function mmToPoints(mm) {
    return UnitValue(mm + " mm").as("pt");
}

// Revised scale script
function scaleFrameProportionally(frame, targetWidthMM) {
    // Convert target width from millimeters to points
    var targetWidthPoints = mmToPoints(targetWidthMM);
    
    // Get the current width in points
    var currentWidthPoints = frame.geometricBounds[3] - frame.geometricBounds[1];
    currentWidthPoints = mmToPoints(currentWidthPoints); // Convert to points if necessary

    // Calculate the scale factor
    var scaleFactor = targetWidthPoints / currentWidthPoints;

    // Ensure that the scale factor is valid
    if (scaleFactor <= 0 || !isFinite(scaleFactor)) {
        alert("Invalid scale factor.");
        return;
    }
    
    // Apply the scaling transformation
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

// Example usage of the scale script
function applyProportionalScaling() {
    if (app.selection.length === 0 || !(app.selection[0] instanceof Rectangle)) {
        alert("Please select a valid frame and run the script again.");
        return;
    }

    // Assuming the target width to scale to is 92.5 mm
    var targetWidthMM = 92.5;
    var frame = app.selection[0];

    scaleFrameProportionally(frame, targetWidthMM);
}

applyProportionalScaling();
