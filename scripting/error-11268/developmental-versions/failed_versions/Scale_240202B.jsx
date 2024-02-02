function scaleFrameProportionally(frame, targetWidthPoints) {
    try {
        // Get the current width in points
        var currentWidthPoints = frame.geometricBounds[3] - frame.geometricBounds[1];

        // Check if the frame already is at the target width
        if (currentWidthPoints === targetWidthPoints) {
            alert("The frame is already at the target width.");
            return;
        }

        // Ensure the current width is not zero
        if (currentWidthPoints === 0) {
            alert("The current width of the frame is zero, which cannot be scaled.");
            return;
        }

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
    } catch (e) {
        alert("An error occurred during scaling: " + e.toString());
    }
}

// Example usage
function applyProportionalScaling() {
    // ...
    var targetWidthMM = 92.5; // The width you want to resize to in millimeters
    var targetWidthPoints = UnitValue(targetWidthMM + " mm").as("pt");
    // ...
    scaleFrameProportionally(frame, targetWidthPoints);
}

applyProportionalScaling();
