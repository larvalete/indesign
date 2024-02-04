// Function to crop the width of a frame from the center
function cropFrameWidth(frame, targetWidth) {
    // Calculate the center X position
    var centerX = (frame.geometricBounds[1] + frame.geometricBounds[3]) / 2;
    
    // Calculate new left and right positions based on target width
    var left = centerX - (targetWidth / 2);
    var right = centerX + (targetWidth / 2);
    
    // Set the new geometric bounds
    frame.geometricBounds = [
        frame.geometricBounds[0], // Top position remains the same
        left,                     // New left position
        frame.geometricBounds[2], // Bottom position remains the same
        right                     // New right position
    ];
}

// Function to crop the width of a frame from the left-center anchor point
function cropFrameWidthFromLeftCenter(frame, targetWidth) {
    var leftX = frame.geometricBounds[1]; // Current left X position
    var rightX = leftX + targetWidth;     // New right X position calculated from the left
    
    // Set the new geometric bounds without changing the height
    frame.geometricBounds = [
        frame.geometricBounds[0], // Top position remains the same
        leftX,                    // Left position remains the same
        frame.geometricBounds[2], // Bottom position remains the same
        rightX                    // New right position
    ];
}

// Function to crop the height of a frame from the center
function cropFrameHeight(frame, targetHeight) {
    var verticalCenter = (frame.geometricBounds[0] + frame.geometricBounds[2]) / 2;
    var topEdge = verticalCenter - targetHeight / 2;
    var bottomEdge = verticalCenter + targetHeight / 2;
    
    // Set the new geometric bounds
    frame.geometricBounds = [topEdge, frame.geometricBounds[1], bottomEdge, frame.geometricBounds[3]];
}

// Function to proportionally resize the frame grid to a given width
function resizeFrameGrid(frame, targetWidth) {
    // Get the current bounds of the frame
    var top = frame.geometricBounds[0];
    var left = frame.geometricBounds[1];
    var bottom = frame.geometricBounds[2];
    var right = frame.geometricBounds[3];
    
    // Calculate current width and height
    var currentWidth = right - left;
    var currentHeight = bottom - top;

    // Calculate the aspect ratio of the frame
    var aspectRatio = currentHeight / currentWidth;
    
    // Calculate the new height based on the aspect ratio
    var newHeight = targetWidth * aspectRatio;

    // Calculate new bounds for the frame
    var newRight = left + targetWidth;
    var newBottom = top + newHeight;

    // Set the new geometric bounds to resize the frame grid
    frame.geometricBounds = [top, left, newBottom, newRight];
}


// Main script function that applies a sequence of transformations to a single selected frame
function applyTransformationsToFrame() {
    // Ensure there is a selection
    if (app.selection.length === 0 || !(app.selection[0] instanceof Rectangle)) {
        alert("Please select a valid frame and run the script again.");
        return;
    }

    var frame = app.selection[0];

    // Apply transformations
    cropFrameWidth(frame, 228);                // Step 1: Crop the frame to width 228 from the center
    cropFrameWidthFromLeftCenter(frame, 109);  // Step 2: Crop to width 109 from left-center
    cropFrameHeight(frame, 350);               // Step 3: Crop the frame to height 350 from the center
    resizeFrameGrid(frame, 92.5);              // Step 4: Proportionally resize the frame grid to width 92.5
}

// Run the main function
applyTransformationsToFrame();
