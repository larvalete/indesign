var mySelection = app.selection[0];

// Check if the selection is a regular frame (e.g., Rectangle, TextFrame)
if (mySelection instanceof Rectangle || mySelection instanceof TextFrame) {
    // It's a regular frame
}

// Check if the selection is a text frame with a frame grid
if (mySelection instanceof TextFrame && mySelection.textFramePreferences.useFrameGrid) {
    // It's a frame grid
}
