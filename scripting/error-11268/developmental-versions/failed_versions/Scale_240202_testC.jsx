// Function to convert millimeters to points
function mmToPoints(mm) {
    return UnitValue(mm + " mm").as("pt");
}

// Function to log messages to the JavaScript Console of the ExtendScript Toolkit
function log(message) {
    $.writeln(message); // This logs to the ESTK Console. Replace with alert(message); for on-screen alerts.
}

// Function to resize the frame's width while maintaining the height proportionally
function adjustFrameWidth(frame, currentWidthMM, targetWidthMM) {
    // Convert millimeters to points
    var currentWidthPoints = mmToPoints(currentWidthMM);
    var targetWidthPoints = mmToPoints(targetWidthMM);

    // Calculate the current width of the frame in points
    var frameCurrentWidthPoints = frame.geometricBounds[3] - frame.geometricBounds[1];

    log("Expected current width in points: " + currentWidthPoints);
    log("Actual current width in points: " + frameCurrentWidthPoints);

    // Allow for a small margin of error in the width check
    var tolerance = 0.1; // 0.1 mm tolerance for example
    if (Math.abs(frameCurrentWidthPoints - currentWidthPoints) <= tolerance) {
        // Calculate the scale factor based on the target width
        var scaleFactor = targetWidthPoints / frameCurrentWidthPoints;
        log("Scale factor: " + scaleFactor);

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

        var newWidthPoints = frame.geometricBounds[3] - frame.geometricBounds[1];
        log("New width in points after scaling: " + newWidthPoints);
    } else {
        log("The current width of the frame does not match the expected width within the tolerance range.");
    }
}

// Main function to apply the width adjustment with logging
function applyWidthAdjustment() {
    if (app.selection.length === 0 || !(app.selection[0] instanceof Rectangle)) {
        log("No selection. Please select a frame and run the script again.");
        return;
    }

    var frame = app.selection[0];
    var currentExpectedWidthMM = 109; // The width the frame should currently have in millimeters
    var targetWidthMM = 92.5; // The width you want to adjust to in millimeters

    log("Starting the width adjustment process.");
    adjustFrameWidth(frame, currentExpectedWidthMM, targetWidthMM);
    log("Width adjustment process completed.");
}

// Run the main script function
applyWidthAdjustment();
