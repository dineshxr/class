import React, { useState } from 'react';
import { BackgroundGradient } from '../../components/ui/background-gradient';
import { Plus, Trash2, Download, Upload } from 'lucide-react';
import { cn } from '../../lib/utils';

export function RandomNamePicker() {
  const [names, setNames] = useState<string[]>([]);
  const [newName, setNewName] = useState('');
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

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

  const addName = () => {
    if (newName.trim() && !names.includes(newName.trim())) {
      setNames([...names, newName.trim()]);
      setNewName('');
    }
  };

  const removeName = (nameToRemove: string) => {
    setNames(names.filter(name => name !== nameToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addName();
    }
  };

  const importNames = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const importedNames = text.split('\n')
          .map(name => name.trim())
          .filter(name => name && !names.includes(name));
        setNames([...names, ...importedNames]);
      };
      reader.readAsText(file);
    }
  };

  const exportNames = () => {
    const blob = new Blob([names.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'names.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || names.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw wheel segments
    names.forEach((name, index) => {
      const startAngle = (index * 2 * Math.PI) / names.length + rotation;
      const endAngle = ((index + 1) * 2 * Math.PI) / names.length + rotation;

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
      ctx.fillText(name, radius - 20, 6);
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

  }, [names, rotation]);

  const spinWheel = () => {
    if (isSpinning || names.length === 0) return;

    setIsSpinning(true);
    setSelectedName(null);

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
          (names.length - 1) * (normalizedRotation / (2 * Math.PI))
        );
        const selected = names[itemIndex];
        setSelectedName(selected);
        setIsSpinning(false);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Random Name Picker
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Add names and spin the wheel to randomly select someone!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Names Management Section */}
          <BackgroundGradient className="p-6 rounded-2xl">
            <div className="space-y-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter a name"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                />
                <button
                  onClick={addName}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-4">
                <div className="relative flex-1">
                  <input
                    type="file"
                    onChange={importNames}
                    accept=".txt"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button className="w-full px-4 py-2 bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    Import Names
                  </button>
                </div>
                <button
                  onClick={exportNames}
                  disabled={names.length === 0}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  Export Names
                </button>
              </div>

              <div className="max-h-[400px] overflow-y-auto space-y-2">
                {names.map((name, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-2 bg-white dark:bg-zinc-800 rounded-lg"
                  >
                    <span className="text-gray-900 dark:text-white">{name}</span>
                    <button
                      onClick={() => removeName(name)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </BackgroundGradient>

          {/* Spin Wheel Section */}
          <BackgroundGradient className="p-6 rounded-2xl">
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={500}
                height={500}
                className="w-full max-w-[500px] h-auto mx-auto"
              />
              {names.length > 0 && (
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
              )}
              {selectedName && (
                <div className="mt-4 text-center text-xl font-bold text-gray-900 dark:text-white">
                  Selected: {selectedName}
                </div>
              )}
              {names.length === 0 && (
                <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Add names to start spinning the wheel!
                </div>
              )}
            </div>
          </BackgroundGradient>
        </div>
      </div>
    </div>
  );
}
