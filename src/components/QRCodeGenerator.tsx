"use client";

import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import * as htmlToImage from "html-to-image";

interface QRCodeGeneratorProps {
  defaultValue?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  defaultValue = "",
}) => {
  const [text, setText] = useState(defaultValue);
  const [size, setSize] = useState(256);
  const [qrColor, setQrColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (qrCodeRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(qrCodeRef.current);
        const link = document.createElement("a");
        link.download = `qr-code-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Error downloading QR code:", error);
      }
    }
  };

  const predefinedColors = [
    "#000000",
    "#1F2937",
    "#DC2626",
    "#2563EB",
    "#7C3AED",
    "#DB2777",
    "#059669",
    "#D97706",
  ];

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="text"
          className="block text-base font-semibold text-gray-900"
        >
          Enter Text or URL
        </label>
        <input
          type="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL to generate QR code"
          className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
        />
      </div>

      <div className="space-y-3">
        <label
          htmlFor="size"
          className="block text-base font-semibold text-gray-900"
        >
          QR Code Size
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            id="size"
            min="128"
            max="512"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm font-medium text-gray-700 min-w-[60px]">
            {size}px
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-base font-semibold text-gray-900">
          QR Code Color
        </label>
        <div className="flex flex-wrap gap-2">
          {predefinedColors.map((color) => (
            <button
              key={color}
              onClick={() => setQrColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                qrColor === color
                  ? "border-blue-500 scale-110"
                  : "border-gray-200"
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            />
          ))}
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="w-8 h-8 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center"
              aria-label="Custom color"
            >
              <span className="text-sm">+</span>
            </button>
            {showColorPicker && (
              <div className="absolute top-full mt-2 left-0 z-10">
                <input
                  type="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="w-8 h-8"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        ref={qrCodeRef}
        className="flex justify-center bg-white p-4 rounded-lg shadow-sm"
      >
        <QRCodeCanvas
          value={text || " "}
          size={size}
          fgColor={qrColor}
          level="H"
          includeMargin
        />
      </div>

      <button
        onClick={handleDownload}
        disabled={!text}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        Download QR Code
      </button>
    </div>
  );
};

export default QRCodeGenerator;
