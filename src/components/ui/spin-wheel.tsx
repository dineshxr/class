import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface SpinWheelProps {
  items: string[];
  onSpinEnd?: (item: string) => void;
  className?: string;
}

export function SpinWheel({ items, onSpinEnd, className }: SpinWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const colors = [
    '#FF4136', // Red
    '#FFDC00', // Yellow
    '#2ECC40', // Green
    '#0074D9', // Blue
    '#B10DC9', // Purple
    '#FF851B', // Orange
    '#7FDBFF', // Light Blue
    '#F012BE', // Pink
    '#01FF70', // Lime
    '#DDDDDD', // Gray
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw wheel segments
    items.forEach((item, index) => {
      const startAngle = (index * 2 * Math.PI) / items.length + rotation;
      const endAngle = ((index + 1) * 2 * Math.PI) / items.length + rotation;

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + (endAngle - startAngle) / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#000';
      ctx.font = 'bold 16px Arial';
      ctx.fillText(item, radius - 20, 6);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();

    // Draw pointer
    ctx.beginPath();
    ctx.moveTo(centerX + 20, centerY);
    ctx.lineTo(centerX + 40, centerY - 10);
    ctx.lineTo(centerX + 40, centerY + 10);
    ctx.closePath();
    ctx.fillStyle = '#333';
    ctx.fill();

  }, [items, rotation]);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedItem(null);

    // Random number of full rotations (3-5) plus a random segment
    const spinDuration = 5000; // 5 seconds
    const totalRotation = 
      Math.floor(Math.random() * 3 + 8) * 2 * Math.PI + // Full rotations
      Math.random() * 2 * Math.PI; // Random segment

    // Animate the spin
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);

      // Easing function for smooth deceleration
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const currentRotation = totalRotation * easeOut(progress);
      
      setRotation(currentRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Calculate selected item
        const normalizedRotation = currentRotation % (2 * Math.PI);
        const itemIndex = Math.floor(
          (items.length - 1) * (normalizedRotation / (2 * Math.PI))
        );
        const selected = items[itemIndex];
        setSelectedItem(selected);
        setIsSpinning(false);
        onSpinEnd?.(selected);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className={cn("relative", className)}>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="w-full max-w-[500px] h-auto"
      />
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "px-6 py-2 bg-blue-600 text-white rounded-full",
          "transform hover:scale-105 transition-transform",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {isSpinning ? "Spinning..." : "Spin"}
      </button>
      {selectedItem && (
        <div className="mt-4 text-center text-xl font-bold">
          Selected: {selectedItem}
        </div>
      )}
    </div>
  );
}
