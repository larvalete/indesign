// Function to adjust the frame's width directly in millimeters
function adjustFrameWidth(frame, currentWidthMM, targetWidthMM) {
    // Get the current width of the frame in millimeters
    var frameCurrentWidthMM = frame.geometricBounds[3] - frame.geometricBounds[1];

    // Check if the current width matches the expected width
    if (Math.abs(frameCurrentWidthMM - currentWidthMM) < 0.1) { // A tolerance for slight measurement inaccuracies
        // Calculate the scale factor based on the target width
        var scaleFactor = targetWidthMM / currentWidthMM;

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
        alert("The current width of the frame does not match the expected width of " + currentWidthMM + " mm.");
    }
}

// Main function to apply the width adjustment
function applyWidthAdjustment() {
    if (app.selection.length === 0 || !(app.selection[0] instanceof Rectangle)) {
        alert("Please select a valid frame and run the script again.");
        return;
    }

    var frame = app.selection[0];
    var currentExpectedWidthMM = 109; // The current width the frame should have in millimeters
    var targetWidthMM = 92.5; // The width you want to adjust to in millimeters

    adjustFrameWidth(frame, currentExpectedWidthMM, targetWidthMM);
}

// Run the main script function
applyWidthAdjustment();
