// Function to convert millimeters to points
function mmToPoints(mm) {
    return UnitValue(mm + " mm").as("pt");
}

// Function to adjust the frame's width from 109mm to 92.5mm while maintaining the height proportionally
function adjustFrameWidth(frame, currentWidthMM, targetWidthMM) {
    // Convert millimeters to points
    var currentWidthPoints = mmToPoints(currentWidthMM);
    var targetWidthPoints = mmToPoints(targetWidthMM);

    // Calculate the current width of the frame in points
    var frameCurrentWidthPoints = frame.geometricBounds[3] - frame.geometricBounds[1];
    
    // Check if the current width is approximately 109mm (allow for a small margin of error)
    if (Math.abs(frameCurrentWidthPoints - currentWidthPoints) < 0.1) {
        // Calculate the scale factor based on the target width
        var scaleFactor = targetWidthPoints / frameCurrentWidthPoints;
        
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
    var currentExpectedWidthMM = 109; // The width the frame should currently have in millimeters
    var targetWidthMM = 92.5; // The width you want to adjust to in millimeters

    adjustFrameWidth(frame, currentExpectedWidthMM, targetWidthMM);
}

// Run the main script function
applyWidthAdjustment();
