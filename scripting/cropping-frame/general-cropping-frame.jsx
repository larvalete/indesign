// Function to crop a frame's dimensions from a specified anchor point
function cropFrame(frame, targetWidth, targetHeight, anchor) {
    var bounds = frame.geometricBounds; // [y1, x1, y2, x3] => [top, left, bottom, right]
    var width = bounds[3] - bounds[1];
    var height = bounds[2] - bounds[0];
    
    var newLeft, newTop;
    
    switch(anchor) {
        case "center":
            newLeft = ((bounds[1] + bounds[3]) / 2) - (targetWidth / 2);
            newTop = ((bounds[0] + bounds[2]) / 2) - (targetHeight / 2);
            break;
        case "leftCenter":
            newLeft = bounds[1];
            newTop = ((bounds[0] + bounds[2]) / 2) - (targetHeight / 2);
            break;
        case "bottomCenter":
            newLeft = ((bounds[1] + bounds[3]) / 2) - (targetWidth / 2);
            newTop = bounds[2] - targetHeight;
            break;
        case "topCenter":
            newLeft = ((bounds[1] + bounds[3]) / 2) - (targetWidth / 2);
            newTop = bounds[0];
            break;
        default:
            alert("Invalid anchor point specified.");
            return;
    }

    frame.geometricBounds = [newTop, newLeft, newTop + targetHeight, newLeft + targetWidth];
}

// Main function to apply the transformations
function applyTransformationsToFrame(targetWidth, targetHeight, anchor) {
    if (app.selection.length === 0 || !(app.selection[0] instanceof Rectangle)) {
        alert("Please select a valid frame and run the script again.");
        return;
    }

    var frame = app.selection[0];
    cropFrame(frame, targetWidth, targetHeight, anchor);
}

// Example usage:
// applyTransformationsToFrame(228, 322, "center"); // Crop the frame to 228x322 from the center
// applyTransformationsToFrame(109, 350, "leftCenter"); // Crop the frame to 109x350 from left-center
