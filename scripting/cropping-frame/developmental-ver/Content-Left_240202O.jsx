// Function to crop the width of a frame from the center
function cropFrameWidth(frame, targetWidth) {
    if (targetWidth <= 0) {
        alert("Target width must be greater than zero.");
        return;
    }
    var centerX = (frame.geometricBounds[1] + frame.geometricBounds[3]) / 2;
    var left = centerX - (targetWidth / 2);
    var right = centerX + (targetWidth / 2);
    frame.geometricBounds = [
        frame.geometricBounds[0], // Top
        left,                     // New left
        frame.geometricBounds[2], // Bottom
        right                     // New right
    ];
}

// Function to crop the width of a frame from the left-center anchor point
function cropFrameWidthFromLeftCenter(frame, targetWidth) {
    if (targetWidth <= 0) {
        alert("Target width must be greater than zero.");
        return;
    }
    var leftX = frame.geometricBounds[1];
    var rightX = leftX + targetWidth;
    frame.geometricBounds = [
        frame.geometricBounds[0], // Top
        leftX,                    // Left
        frame.geometricBounds[2], // Bottom
        rightX                    // New right
    ];
}

// Function to crop the height of a frame from the center
function cropFrameHeight(frame, targetHeight) {
    if (targetHeight <= 0) {
        alert("Target height must be greater than zero.");
        return;
    }
    var verticalCenter = (frame.geometricBounds[0] + frame.geometricBounds[2]) / 2;
    var topEdge = verticalCenter - (targetHeight / 2);
    var bottomEdge = verticalCenter + (targetHeight / 2);
    frame.geometricBounds = [topEdge, frame.geometricBounds[1], bottomEdge, frame.geometricBounds[3]];
}

function scaleFrameAndContentProportionally(frame, targetWidth) {
    var currentWidth = frame.geometricBounds[3] - frame.geometricBounds[1];
    if (currentWidth <= 0) {
        alert("Current width is non-positive, cannot scale.");
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

function applyTransformationsToFrame() {
    if (app.selection.length === 0 || !(app.selection[0] instanceof Rectangle)) {
        alert("Please select a valid frame and run the script again.");
        return;
    }

    var frame = app.selection[0];

    cropFrameWidth(frame, 228);               // Crop the frame to width 228 from the center
    cropFrameWidthFromLeftCenter(frame, 109); // Crop to width 109 from left-center
    cropFrameHeight(frame, 350);              // Crop the frame to height 350 from the center
    scaleFrameAndContentProportionally(frame, 92.5); // Scale the frame and its content
}

applyTransformationsToFrame();
