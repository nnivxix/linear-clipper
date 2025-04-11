![LinearClipper](./asssets/LinearClipperBanner.jpg)

# LinearClipper

LinearClipper is a browser extension that streamlines copying and pasting text snippets from Linear.app. It offers a simple and efficient way to manage clipboard content, especially when working with Markdown.

## Features

- Copy text snippets from web pages with a single click.
- Paste copied snippets directly into text fields or documents.
<!-- - Manage and organize copied snippets for easy access. -->

## Fiefox Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nnivxix/linear-clipper.git
   ```

2. Open Firefox and navigate to `about:debugging`.
3. Click on "This Firefox" and then "Load Temporary Add-on".
4. Select the `manifest.json` file from the cloned repository.

## Chromium Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nnivxix/linear-clipper.git
   ```

2. Open Chromium and navigate to `chrome://extensions`.
3. Enable "Developer mode" in the top right corner.
4. Click on "Load unpacked" and select the cloned repository directory.

## How To Build (Firefox)

1. Install [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/)
2. Build the extension
   ```bash
   web-ext build
   ```

## Usage

- Once installed, the Linear Clipper extension icon will appear in your browser's toolbar.
- When you're on a Linear page, simply click the extension icon.
- The extension will automatically detect and copy the relevant text snippet to your clipboard.
- You can then paste the snippet into any text field or document.

## Contributing

Feel free to submit issues or pull requests to improve the extension.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
