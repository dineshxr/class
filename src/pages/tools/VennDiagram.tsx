import React, { useState } from 'react';
import { Plus, X, Download } from 'lucide-react';
import { SEO } from '../../components/SEO';

interface Circle {
  id: string;
  label: string;
  items: string[];
  color: string;
}

interface Intersection {
  circles: string[];
  items: string[];
}

export function VennDiagram() {
  const [circles, setCircles] = useState<Circle[]>([
    { id: 'A', label: 'Set A', items: [], color: 'rgba(59, 130, 246, 0.2)' },
    { id: 'B', label: 'Set B', items: [], color: 'rgba(239, 68, 68, 0.2)' }
  ]);
  const [intersectionItems, setIntersectionItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');
  const [selectedCircle, setSelectedCircle] = useState<string>('A');
  const [isIntersection, setIsIntersection] = useState(false);

  const addItem = () => {
    if (!newItem.trim()) return;

    if (isIntersection) {
      setIntersectionItems([...intersectionItems, newItem.trim()]);
    } else {
      setCircles(circles.map(circle => 
        circle.id === selectedCircle
          ? { ...circle, items: [...circle.items, newItem.trim()] }
          : circle
      ));
    }
    setNewItem('');
  };

  const removeItem = (item: string, from: 'intersection' | string) => {
    if (from === 'intersection') {
      setIntersectionItems(intersectionItems.filter(i => i !== item));
    } else {
      setCircles(circles.map(circle =>
        circle.id === from
          ? { ...circle, items: circle.items.filter(i => i !== item) }
          : circle
      ));
    }
  };

  const downloadSVG = () => {
    const svg = document.querySelector('.venn-diagram svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'venn-diagram.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEO 
        title="Free Venn Diagram Generator | Visual Learning Tool | ClassTool.org"
        description="Create beautiful Venn diagrams for your classroom. Perfect for comparing and contrasting concepts, teaching set theory, and visual learning."
        keywords={[
          'venn diagram generator',
          'venn diagram maker',
          'free venn diagram tool',
          'classroom venn diagram',
          'educational venn diagram',
          'compare and contrast tool',
          'set theory visualization'
        ]}
        canonicalUrl="https://classtool.org/tools/venn-diagram"
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Venn Diagram Generator</h1>
          <p className="text-gray-600">Create interactive Venn diagrams to compare and contrast concepts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex gap-4 mb-6">
              <select
                value={selectedCircle}
                onChange={(e) => {
                  setSelectedCircle(e.target.value);
                  setIsIntersection(false);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {circles.map(circle => (
                  <option key={circle.id} value={circle.id}>
                    {circle.label}
                  </option>
                ))}
                <option value="intersection">Intersection</option>
              </select>
              
              <div className="flex-1">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addItem()}
                  placeholder="Add an item"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <button
                onClick={addItem}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {circles.map(circle => (
                <div key={circle.id} className="space-y-2">
                  <h3 className="font-semibold text-lg">{circle.label}</h3>
                  <div className="space-y-2">
                    {circle.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg"
                      >
                        <span>{item}</span>
                        <button
                          onClick={() => removeItem(item, circle.id)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Intersection</h3>
                <div className="space-y-2">
                  {intersectionItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg"
                    >
                      <span>{item}</span>
                      <button
                        onClick={() => removeItem(item, 'intersection')}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="venn-diagram relative aspect-square">
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full"
              >
                {/* Circle A */}
                <circle
                  cx="175"
                  cy="200"
                  r="120"
                  fill={circles[0].color}
                  stroke="#3B82F6"
                  strokeWidth="2"
                />
                <text x="80" y="200" className="font-semibold">{circles[0].label}</text>
                
                {/* Circle B */}
                <circle
                  cx="225"
                  cy="200"
                  r="120"
                  fill={circles[1].color}
                  stroke="#EF4444"
                  strokeWidth="2"
                />
                <text x="320" y="200" className="font-semibold">{circles[1].label}</text>
                
                {/* Items for Circle A */}
                <foreignObject x="20" y="100" width="120" height="200">
                  <div className="text-sm space-y-1">
                    {circles[0].items.map((item, i) => (
                      <div key={i}>{item}</div>
                    ))}
                  </div>
                </foreignObject>
                
                {/* Items for Circle B */}
                <foreignObject x="260" y="100" width="120" height="200">
                  <div className="text-sm space-y-1">
                    {circles[1].items.map((item, i) => (
                      <div key={i}>{item}</div>
                    ))}
                  </div>
                </foreignObject>
                
                {/* Intersection Items */}
                <foreignObject x="160" y="170" width="80" height="200">
                  <div className="text-sm space-y-1 text-center">
                    {intersectionItems.map((item, i) => (
                      <div key={i}>{item}</div>
                    ))}
                  </div>
                </foreignObject>
              </svg>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={downloadSVG}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <Download className="h-5 w-5" />
                Download Diagram
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
