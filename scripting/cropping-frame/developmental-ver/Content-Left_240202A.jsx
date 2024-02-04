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
    var centerY = (frame.geometricBounds[0] + frame.geometricBounds[2]) / 2; // Center Y position
    
    frame.geometricBounds = [
        frame.geometricBounds[0], // Top position remains the same
        leftX,                    // Left position remains the same
        centerY + (targetWidth / 2), // New bottom position calculated from the center Y
        frame.geometricBounds[3]  // Right position remains the same
    ];


// Function to crop the height of a frame from the center
function cropFrameHeight(frame, targetHeight) {
    var verticalCenter = (frame.geometricBounds[0] + frame.geometricBounds[2]) / 2;
    var topEdge = verticalCenter - targetHeight / 2;
    var bottomEdge = verticalCenter + targetHeight / 2;
    frame.geometricBounds = [topEdge, frame.geometricBounds[1], bottomEdge, frame.geometricBounds[3]];
}

// Function to shrink the content of the frame to a given width from the center
function shrinkContentWidth(frame, targetWidth) {
    var content = frame.graphics[0];
    if (content) {
        var currentWidth = content.geometricBounds[3] - content.geometricBounds[1];
        var scalingFactor = (targetWidth / currentWidth) * 100; // Calculate scaling factor
        content.horizontalScale = scalingFactor;
        content.verticalScale = scalingFactor;
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

    // Step 1: Crop the frame to width 228 from the center
    cropFrameWidth(frame, 228);

    // Step 2: Crop the frame to width 109 from the left-center
    cropFrameWidthFromLeftCenter(frame, 109);

    // Step 3: Crop the frame to height 350 from the center
    cropFrameHeight(frame, 350);

    // Step 4: Shrink the frame's content to width 92.5 from the center
    shrinkContentWidth(frame, 92.5);
}

// Run the main function
applyTransformationsToFrame();


// Call the function with the desired parameters
var frame = app.selection[0]; // Assuming the frame to crop is selected
cropFrameWidthFromLeftCenter(frame, 109); // s2: Crop to width 109 from left-center

    // Step 3: Crop the frame to height 350
    cropFrameHeight(frame, 350);

    // Step 4: Shrink the frame's content to width 92.5
    shrinkContentWidth(frame, 92.5);

    // Add additional transformations as needed
}

// Run the main function
applyTransformationsToFrame();
