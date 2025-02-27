Title:
Generate a QR Code Generator Web App using Next.js

Description:
Build a fully functional QR Code Generator web app using Next.js, TypeScript, and Tailwind CSS. The app should allow users to input text or URLs and generate QR codes instantly. It should also provide options to download the generated QR code as an image.

Requirements:
1. Tech Stack
Next.js (App Router) – For building the frontend
TypeScript – For type safety
Tailwind CSS – For styling
QRCode.react – To generate QR codes
html-to-image – To download the QR code as an image

2. Features
✅ Text/URL Input: Users can enter any text or URL in an input field.
✅ QR Code Generation: Dynamically generate a QR code based on the input.
✅ Download QR Code: Provide a button to download the generated QR code as a PNG image.
✅ Customization Options: Allow users to change QR code size and color.
✅ Mobile Responsive: The UI should be fully responsive for mobile users.

3. Component Breakdown
Home Page (/)
A text input field to enter the URL or text
A button to generate the QR code
A section to display the generated QR code
A download button to save the QR code
QR Code Component (components/QRCodeGenerator.tsx)

Accepts input text and generates a QR code
Uses the qrcode.react library to render the QR code
Provides a download button using html-to-image
Styling & UI

Use Tailwind CSS for modern, minimal UI
Ensure a clean, user-friendly experience

