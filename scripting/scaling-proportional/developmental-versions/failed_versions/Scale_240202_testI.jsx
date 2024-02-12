// Function to manually set the width of the frame in points
function setWidth(frame, targetWidthPt) {
    // Extract the current geometric bounds: [y1, x1, y2, x2]
    var bounds = frame.geometricBounds;

    // Calculate the current width
    var currentWidthPt = bounds[3] - bounds[1];

    // Calculate the difference in width
    var deltaWidthPt = targetWidthPt - currentWidthPt;

    // Calculate the new right x coordinate of the frame
    var newX2 = bounds[3] + deltaWidthPt;

    // Set the new geometric bounds
    frame.geometricBounds = [bounds[0], bounds[1], bounds[2], newX2];
}

// Main function to adjust the width of the selected frame
function applyWidthAdjustment() {
    if (app.selection.length === 0 || !(app.selection[0] instanceof Rectangle)) {
        alert("Please select a rectangle frame and run the script again.");
        return;
    }

    var frame = app.selection[0];
    var targetWidthPt = 92.5; // Target width in points

    // Apply the width adjustment
    setWidth(frame, targetWidthPt);
}

// Run the main script function
applyWidthAdjustment();
