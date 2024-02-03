# InDesign Absolute Positioning Script

This repository contains a script for Adobe InDesign that allows you to move an object to an absolute position within a document. It is designed to address and overcome issues related to object displacement during script execution.

## Description

The included ExtendScript (`moveToAbsolutePosition.jsx`) enables precise positioning of objects in an InDesign document. It ensures an object can be moved to specific coordinates without the risk of unintended movement on subsequent script runs. The script is particularly useful for tasks that require exact placement of page items, such as automated layout creation or adjustments.

## Features

- Move any selected object to an exact location within the page coordinates.
- Prevents the object from moving if it is already at the target coordinates.
- Accounts for potential transformations that may affect the object's position.
- Easy to use and integrate into existing InDesign workflows.

## Getting Started

To use the script, follow these steps:

1. Open your InDesign document and select the object you wish to move.
2. Run the script from the Scripts Panel within InDesign.
3. Enter the desired X and Y coordinates when prompted.

## Requirements

- Adobe InDesign CC (the script has been tested with CC 2019 and newer)
- Basic knowledge of running scripts within InDesign

## Installation

Download the `moveToAbsolutePosition.jsx` file and place it in the following directory depending on your operating system:

- **Windows**: `C:\Program Files\Adobe\Adobe InDesign [Version]\Scripts\Scripts Panel`
- **macOS**: `/Applications/Adobe InDesign [Version]/Scripts/Scripts Panel`

## Usage

Once the script is placed in the correct directory, it can be run from within InDesign:

1. Go to `Window > Utilities > Scripts` to open the Scripts Panel.
2. Locate `moveToAbsolutePosition.jsx` under the `User` scripts area.
3. Double-click the script to run it.

## Contributing

Contributions to this script are welcome! If you have suggestions for improvements or encounter any issues, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to the Adobe InDesign scripting community for continuous support and inspiration.
- This script was created to address specific challenges faced when automating document layouts.
