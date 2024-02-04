Cropping Frame Scripts for Adobe InDesign
This directory contains a collection of scripts designed to enhance the cropping capabilities within Adobe InDesign. These scripts allow users to precisely adjust the size and position of frames based on various anchor points.

Overview
The crop scripts included here enable modifications to frame dimensions from specified anchor points, such as the center, left-center, bottom-center, and top-center. This flexibility facilitates more efficient layout adjustments and document preparation in Adobe InDesign.

Scripts Included
General Crop Script (generalCropScript.jsx): Allows for dynamic cropping of frame dimensions from a chosen anchor point. Supports target width, target height, and anchor point specification.

Additional Crop Variations:

TBD based on your script files: Descriptions for any additional specific crop scripts you've included.
How to Use
Select a Frame: In your Adobe InDesign document, select the frame you wish to crop.
Run the Script: Navigate to the Scripts Panel within InDesign (Window > Utilities > Scripts), find the script you wish to use, and double-click to run it.
Enter Parameters: If the script prompts for parameters (such as target dimensions and anchor point), enter them as instructed.
Example
To crop a frame to a width of 200 and a height of 100 from the center:

javascript
Copy code
applyTransformationsToFrame(200, 100, "center");
Replace applyTransformationsToFrame with the correct function call as per your script.

Installation
To use these scripts, you must first download them and place them in the appropriate Scripts Panel directory of your Adobe InDesign installation.

Windows: C:\Program Files\Adobe\Adobe InDesign [Version]\Scripts\Scripts Panel
macOS: /Applications/Adobe InDesign [Version]/Scripts/Scripts Panel
After placing the script in the directory, it will be accessible from the Scripts Panel in Adobe InDesign.

Contributing
Feedback and contributions are highly welcomed. If you have enhancements, bug fixes, or additional scripts that you believe would benefit this collection, please feel free to fork the repository, make your changes, and submit a pull request.