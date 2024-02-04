// Function to crop the width of a frame from the center
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



// Main function to apply the transformations
function applyTransformationsToFrame() {
    if (app.selection.length === 0 || !(app.selection[0] instanceof Rectangle)) {
        alert("Please select a valid frame and run the script again.");
        return;
    }

    var frame = app.selection[0];

    cropFrameHeightFromBottom(frame, 350);      // HB: Crop the frame to height 350 from the bottom
    cropFrameHeightFromTop(frame, 322);         // HT: Crop the frame to height 322 from the top
    cropFrameWidth(frame, 228);                 // WC: Crop the frame to width 228 from the center
    cropFrameWidthFromLeftCenter(frame, 109);   // WL: Crop to width 109 from left-center
}

// Run the main script function
applyTransformationsToFrame();
