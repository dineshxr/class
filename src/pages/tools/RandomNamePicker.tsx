import React, { useState } from 'react';
import { Shuffle, Plus, X } from 'lucide-react';
import { SEO } from '../../components/SEO';

export function RandomNamePicker() {
  const [names, setNames] = useState<string[]>([]);
  const [newName, setNewName] = useState('');
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const addName = () => {
    if (newName.trim()) {
      setNames([...names, newName.trim()]);
      setNewName('');
    }
  };

  const removeName = (index: number) => {
    setNames(names.filter((_, i) => i !== index));
  };

  const spinWheel = () => {
    if (names.length === 0 || isSpinning) return;
    
    setIsSpinning(true);
    setSelectedName(null);
    
    // Simulate spinning animation
    const duration = 2000;
    const intervals = 10;
    const steps = duration / intervals;
    
    let count = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      setSelectedName(names[randomIndex]);
      count++;
      
      if (count >= steps) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, intervals);
  };

  return (
    <>
      <SEO 
        title="Random Name Picker | Free Classroom Tool for Teachers | ClassTool.org"
        description="Free random name picker tool for teachers. Randomly select students from your class list. Perfect for fair participation and classroom engagement."
        keywords={[
          'random name picker',
          'name picker for classroom',
          'random student selector',
          'classroom name picker',
          'random name generator for teachers',
          'fair student participation tool'
        ]}
        canonicalUrl="https://classtool.org/tools/random-name-picker"
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Random Name Picker</h1>
          <p className="text-gray-600">Add names to the list and spin the wheel to randomly select one!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Name List</h2>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addName()}
                placeholder="Enter a name"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={addName}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {names.map((name, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg"
                >
                  <span>{name}</span>
                  <button
                    onClick={() => removeName(index)}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {names.length === 0 && (
                <p className="text-gray-500 text-center py-4">Add some names to get started!</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
            <div className="relative w-64 h-64 mb-6">
              <div className={`w-full h-full rounded-full border-8 border-indigo-600 flex items-center justify-center transition-transform duration-200 ${isSpinning ? 'animate-spin' : ''}`}>
                {selectedName ? (
                  <span className="text-xl font-bold text-indigo-600 text-center px-4">
                    {selectedName}
                  </span>
                ) : (
                  <Shuffle className="h-12 w-12 text-indigo-600" />
                )}
              </div>
            </div>

            <button
              onClick={spinWheel}
              disabled={names.length === 0 || isSpinning}
              className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                names.length === 0 || isSpinning
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              } transition-colors`}
            >
              <Shuffle className="h-5 w-5" />
              Spin the Wheel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}