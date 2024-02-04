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


function scaleFrameAndContentProportionally(frame, targetWidth) {
    var currentWidth = frame.geometricBounds[3] - frame.geometricBounds[1];
    var scaleFactor = targetWidth / currentWidth; // Calculate the scaling factor
    
    // Check if the scaling factor is valid
    if (scaleFactor <= 0 || !isFinite(scaleFactor)) {
        alert("Cannot scale frame: scale factor is invalid or not finite.");
        return;
    }
    
    // Apply the scaling transformation
    frame.transform(
        CoordinateSpaces.PASTEBOARD_COORDINATES, // Use pasteboard coordinates for transformation
        AnchorPoint.CENTER_ANCHOR,               // Scale from the center anchor point
        [scaleFactor, scaleFactor],              // Scale both horizontally and vertically by scaleFactor
        undefined,                               // No transformation point specified
        true,                                    // Transform content
        true,                                    // Transform strokes (optional)
        true                                     // Transform proportionally (optional)
    );
}


// Adjust the main function to call this new scaling function
function applyTransformationsToFrame() {
    if (app.selection.length === 0 || !(app.selection[0] instanceof Rectangle)) {
        alert("Please select a valid frame and run the script again.");
        return;
    }

    var frame = app.selection[0];

    // Apply transformations
    cropFrameWidth(frame, 228);               // Step 1: Crop the frame to width 228 from the center
    cropFrameWidthFromLeftCenter(frame, 109); // Step 2: Crop to width 109 from left-center
    cropFrameHeight(frame, 350);              // Step 3: Crop the frame to height 350 from the center
    scaleFrameAndContentProportionally(frame, 92.5); // Replace or adjust this call based on your workflow
}

// Run the main script function
applyTransformationsToFrame();
