// Function to adjust the frame's width directly in points
function adjustFrameWidth(frame, currentWidthPt, targetWidthPt) {
    // Get the current width of the frame in points
    var frameCurrentWidthPt = frame.geometricBounds[3] - frame.geometricBounds[1];

    // Check if the current width matches the expected width
    if (Math.abs(frameCurrentWidthPt - currentWidthPt) < 0.1) { // A tolerance for slight measurement inaccuracies
        // Calculate the scale factor based on the target width
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
        alert("The current width of the frame does not match the expected width of " + currentWidthPt + " pt.");
    }
}

// Main function to apply the width adjustment
function applyWidthAdjustment() {
    if (app.selection.length === 0 || !(app.selection[0] instanceof Rectangle)) {
        alert("Please select a valid frame and run the script again.");
        return;
    }

    var frame = app.selection[0];
    var currentExpectedWidthPt = 109; // The current width the frame should have in points
    var targetWidthPt = 92.5; // The width you want to adjust to in points

    adjustFrameWidth(frame, currentExpectedWidthPt, targetWidthPt);
}

// Run the main script function
applyWidthAdjustment();
