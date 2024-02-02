// Function to scale the frame's width from 109pt to 92.5pt
function scaleFrameWidth(frame, currentWidthPt, targetWidthPt) {
    // Get the current width of the frame in points
    var frameCurrentWidthPt = frame.geometricBounds[3] - frame.geometricBounds[1];

    // Check if the current width is approximately 109 points
    if (Math.abs(frameCurrentWidthPt - currentWidthPt) < 0.1) { // Allow for a tiny rounding error
        // Calculate the scale factor
        var scaleFactor = targetWidthPt / currentWidthPt;

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
    } else {
        alert("The current width of the frame is not 109 points. Actual width: " + frameCurrentWidthPt + " points");
    }
}

// Main function to apply the scaling
function applyScaling() {
    if (app.selection.length === 0 || !(app.selection[0] instanceof Rectangle)) {
        alert("Please select a rectangle frame and run the script again.");
        return;
    }

    var frame = app.selection[0];
    var currentExpectedWidthPt = 109; // Expected current width in points
    var targetWidthPt = 92.5; // Target width in points

    scaleFrameWidth(frame, currentExpectedWidthPt, targetWidthPt);
}

// Run the main script function
applyScaling();
