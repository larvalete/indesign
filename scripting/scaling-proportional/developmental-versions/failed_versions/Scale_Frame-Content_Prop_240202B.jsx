function resizeFrameProportionally(frame, targetWidth) {
    // Calculate the current width of the frame
    var currentWidth = frame.geometricBounds[3] - frame.geometricBounds[1];
    
    // Check if the current width is exactly 109 units
    if (currentWidth === 109) {
        // Calculate the scale factor based on the target width
        var scaleFactor = targetWidth / currentWidth;
        
        // Use the transform method to apply the scale, ensuring the height changes in constant ratio
        frame.transform(
            CoordinateSpaces.INNER_COORDINATES, // Specifies the coordinate space
            AnchorPoint.CENTER_ANCHOR, // Specifies the anchor point for the transformation
            [scaleFactor, scaleFactor], // Apply the scale factor to both width and height to maintain aspect ratio
            undefined, // No specific point around which to transform
            true, // Transform content
            true, // Transform strokes (if applicable)
            true // Scale strokes and effects (if applicable)
        );
    } else {
        alert("The selected frame does not have the required width of 109 units.");
    }
}

// Main function to apply the transformations
function applyProportionalResize() {
    if (app.selection.length === 0 || !(app.selection[0] instanceof Rectangle)) {
        alert("Please select a valid frame and run the script again.");
        return;
    }

    var frame = app.selection[0];
    var targetWidth = 92.5; // The width you want to resize to

    resizeFrameProportionally(frame, targetWidth); // Resize width to 92.5 and maintain height in constant ratio only if current width is 109
}

// Run the main script function
applyProportionalResize();
