function adjustFrameWidth(frame, currentWidthMM, targetWidthMM) {
    // ... previous code ...

    var frameCurrentWidthPoints = frame.geometricBounds[3] - frame.geometricBounds[1];
    var frameCurrentWidthMM = UnitValue(frameCurrentWidthPoints + " pt").as("mm");

    // Allow for a small margin of error in the width check
    var tolerance = 0.1; // 0.1 mm tolerance for example
    if (Math.abs(frameCurrentWidthMM - currentWidthMM) <= tolerance) {
        // ... perform the scaling operation ...
    } else {
        alert("The current width of the frame is " + frameCurrentWidthMM.toFixed(2) + " mm, which does not match the expected width of " + currentWidthMM + " mm.");
    }
}

// ... rest of the script ...
