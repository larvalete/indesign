// Adjusted function to crop the width of a frame from the center to 236 units
function cropFrameWidth(frame, targetWidth) {
    var centerX = (frame.geometricBounds[1] + frame.geometricBounds[3]) / 2;
    var left = centerX - (targetWidth / 2);
    var right = centerX + (targetWidth / 2);
    frame.geometricBounds = [
        frame.geometricBounds[0],
        left,
        frame.geometricBounds[2],
        right
    ];
}

// Function to crop the width of a frame from the left-center anchor point
function cropFrameWidthFromLeftCenter(frame, targetWidth) {
    var leftX = frame.geometricBounds[1];
    var rightX = leftX + targetWidth;
    frame.geometricBounds = [
        frame.geometricBounds[0],
        leftX,
        frame.geometricBounds[2],
        rightX
    ];
}

// New function to crop the width of a frame from the right to a target width of 109 units
function cropFrameWidthFromRight(frame, targetWidth) {
    var rightX = frame.geometricBounds[3]; // Current right X position
    var leftX = rightX - targetWidth;      // New left X position calculated from the right
    frame.geometricBounds = [
        frame.geometricBounds[0],
        leftX,
        frame.geometricBounds[2],
        rightX
    ];
}

// Function to crop the height of a frame from the bottom
function cropFrameHeightFromBottom(frame, targetHeight) {
    // Calculate the new top position based on the target height
    // Keep the bottom position fixed and adjust the top
    var bottom = frame.geometricBounds[2]; // Current bottom Y position
    var top = bottom - targetHeight;       // New top Y position calculated from the bottom
    
    // Set the new geometric bounds without changing the width
    frame.geometricBounds = [
        top,                               // New top position
        frame.geometricBounds[1],          // Left position remains the same
        bottom,                            // Bottom position remains the same
        frame.geometricBounds[3]           // Right position remains the same
    ];
}

// Function to crop the height of a frame from the top
function cropFrameHeightFromTop(frame, targetHeight) {
    var top = frame.geometricBounds[0]; // Current top Y position
    var bottom = top + targetHeight;    // New bottom Y position calculated from the top

    // Set the new geometric bounds without changing the width
    frame.geometricBounds = [
        top,                               // Top position remains the same
        frame.geometricBounds[1],          // Left position remains the same
        bottom,                            // New bottom position
        frame.geometricBounds[3]           // Right position remains the same
    ];
}


// Adjust the main function for the second type of transformations
function applyTransformationsToFrameType2() {
    if (app.selection.length === 0 || !(app.selection[0] instanceof Rectangle)) {
        alert("Please select a valid frame and run the script again.");
        return;
    }

    var frame = app.selection[0];

    cropFrameHeightFromBottom(frame, 350);      // HB: Crop the frame to height 350 from the bottom
    cropFrameHeightFromTop(frame, 322);         // HT: Crop the frame to height 322 from the top
    cropFrameWidth(frame, 236);                 // WC: Adjusted to crop the frame to width 236 from the center
    cropFrameWidthFromRight(frame, 109);        // WR: New operation to crop to width 109 from the right
}

// To run the second type of transformations
applyTransformationsToFrameType2();