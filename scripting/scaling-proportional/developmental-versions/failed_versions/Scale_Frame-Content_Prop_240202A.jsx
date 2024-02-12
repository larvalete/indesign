// Function to scale frame and content proportionally
function scaleFrameAndContentProportionally(frame, targetWidth) {
    var currentWidth = frame.geometricBounds[3] - frame.geometricBounds[1];
    var scaleFactor = targetWidth / currentWidth; // Calculate the scaling factor
    
    // Check if the scaling factor is valid
    if (scaleFactor <= 0 || !isFinite(scaleFactor)) {
        alert("Cannot scale frame: scale factor is invalid or not finite.");
        return;
    }
    
    // Apply the scaling transformation
    // This approach assumes the existence of a function to apply a scaling transformation
    // directly to the frame and its content, as the specifics of this operation
    // can depend on the details of the Adobe InDesign scripting environment being used.
    frame.transform(
        CoordinateSpaces.INNER_COORDINATES, // Use inner coordinates for transformation
        AnchorPoint.CENTER_ANCHOR,          // Scale from the center anchor point
        [scaleFactor, scaleFactor],         // Apply the scale factor to both X and Y axes
        undefined,                          // No specific point around which to transform
        true,                               // Transform content
        true                                // Apply to content including frame grid and its content
    );
}

// Adjusted main function to include the proportional scaling step
function applyTransformationsToFrameIncludingScaling() {
    if (app.selection.length === 0 || !(app.selection[0] instanceof Rectangle)) {
        alert("Please select a valid frame and run the script again.");
        return;
    }

    var frame = app.selection[0];

    // Assuming the steps to crop height and width have already been applied
    // and now applying the scaling step
    scaleFrameAndContentProportionally(frame, 92.5); // Scaling to target width of 92.5
}

// Run the updated main script function
applyTransformationsToFrameIncludingScaling();
