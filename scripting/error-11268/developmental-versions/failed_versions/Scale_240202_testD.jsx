// Function to convert millimeters to points
function mmToPoints(mm) {
    return UnitValue(mm + " mm").as("pt");
}

// Function to log messages for debugging
function log(message) {
    alert(message); // Using alert for simplicity. In production, consider logging to a file or the JavaScript Console.
}

// Function to adjust the frame's width and log each step
function adjustFrameWidth(frame, currentWidthMM, targetWidthMM) {
    // Log the intention to adjust the frame width
    log("Attempting to adjust frame width from " + currentWidthMM + "mm to " + targetWidthMM + "mm.");

    // Convert millimeters to points
    var currentWidthPoints = mmToPoints(currentWidthMM);
    var targetWidthPoints = mmToPoints(targetWidthMM);

    // Log the converted values
    log("Converted current width to points: " + currentWidthPoints);
    log("Converted target width to points: " + targetWidthPoints);

    // Calculate the current width of the frame in points
    var frameCurrentWidthPoints = frame.geometricBounds[3] - frame.geometricBounds[1];

    // Log the actual current width of the frame
    log("Actual current width in points: " + frameCurrentWidthPoints);

    // Allow for a small margin of error in the width check
    var tolerance = 0.1; // Adjust tolerance as needed
    if (Math.abs(frameCurrentWidthPoints - currentWidthPoints) <= tolerance) {
        // Calculate the scale factor
        var scaleFactor = targetWidthPoints / frameCurrentWidthPoints;
        log("Calculated scale factor: " + scaleFactor);

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

        // Log the result of the transformation
        var newWidthPoints = frame.geometricBounds[3] - frame.geometricBounds[1];
        log("New width in points after scaling: " + newWidthPoints);
    } else {
        log("The current width of the frame does not match the expected width within the tolerance range.");
    }
}

// Main function to apply the width adjustment and log the process
function applyWidthAdjustment() {
    // Ensure there is a selection and it is a rectangle or text frame
    if (app.selection.length === 0 || !(app.selection[0] instanceof Rectangle || app.selection[0] instanceof TextFrame)) {
        log("No valid frame selected. Please select a frame and run the script again.");
        return;
    }

    // Start the adjustment process
    log("Starting the width adjustment process.");

    var frame = app.selection[0];
    var currentExpectedWidthMM = 109; // Expected current width in millimeters
    var targetWidthMM = 92.5; // Target width in millimeters

    // Apply the adjustment
    adjustFrameWidth(frame, currentExpectedWidthMM, targetWidthMM);

    // Finish the adjustment process
    log("Width adjustment process completed.");
}

// Run the main script function
applyWidthAdjustment();
