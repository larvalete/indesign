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

// Function to crop the height of a frame from the center
function cropFrameHeight(frame, targetHeight) {
    var verticalCenter = (frame.geometricBounds[0] + frame.geometricBounds[2]) / 2;
    var topEdge = verticalCenter - (targetHeight / 2);
    var bottomEdge = verticalCenter + (targetHeight / 2);
    frame.geometricBounds = [
        topEdge,
        frame.geometricBounds[1],
        bottomEdge,
        frame.geometricBounds[3]
    ];
}

// Function to scale frame and content proportionally
function scaleFrameAndContentProportionally(frame, targetWidth) {
    var currentWidth = frame.geometricBounds[3] - frame.geometricBounds[1];

    if (currentWidth <= 0) {
        alert("Cannot scale frame: current width is non-positive.");
        return;
    }

    var scaleFactor = targetWidth / currentWidth;

    if (scaleFactor <= 0 || !isFinite(scaleFactor)) {
        alert("Cannot scale frame: scale factor is invalid or not finite.");
        return;
    }

    frame.transform(
        CoordinateSpaces.PASTEBOARD_COORDINATES,
        AnchorPoint.CENTER_ANCHOR,
        [scaleFactor, scaleFactor],
        undefined,
        undefined,
        true,
        true,
        true
    );
}

// Main function to apply the transformations
function applyTransformationsToFrame() {
    if (app.selection.length === 0 || !(app.selection[0] instanceof Rectangle)) {
        alert("Please select a valid frame and run the script again.");
        return;
    }

    var frame = app.selection[0];

    cropFrameWidth(frame, 228);               // Step 1: Crop the frame to width 228 from the center
    cropFrameWidthFromLeftCenter(frame, 109); // Step 2: Crop to width 109 from left-center
    cropFrameHeight(frame, 350);              // Step 3: Crop the frame to height 350 from the center

    // Ensure frame has valid dimensions before scaling
    var currentWidth = frame.geometricBounds[3] - frame.geometricBounds[1];
    if (currentWidth <= 0) {
        alert("Cannot scale: frame width is invalid after cropping.");
    } else {
        scaleFrameAndContentProportionally(frame, 92.5); // Step 4: Scale the frame and its content
    }
}

// Run the main script function
applyTransformationsToFrame();
