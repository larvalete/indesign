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

// Function to proportionally shrink the content of the frame to a given width
function shrinkContentWidth(frame, targetWidth) {
    // Loop through all graphics within the frame
    for (var i = 0; i < frame.allGraphics.length; i++) {
        var content = frame.allGraphics[i];
        if (content) {
            // Determine the current width
            var currentWidth = content.geometricBounds[3] - content.geometricBounds[1];
            // Calculate scaling factor
            var scalingFactor = (targetWidth / currentWidth) * 100; // Scaling factor as a percentage

            // Apply proportional scaling to the content
            content.horizontalScale = scalingFactor;
            content.verticalScale = scalingFactor; // Apply the same scaling factor to height to maintain the aspect ratio
        }
    }
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
    shrinkContentWidth(frame, 92.5);           // Step 4: Proportionally shrink the frame's content to width 92.5
}

// Run the main function
applyTransformationsToFrame();
