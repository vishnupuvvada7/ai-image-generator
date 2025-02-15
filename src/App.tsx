import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = () => {
    setIsLoading(true);
    // Constructing the Pollinations.ai URL with the user's prompt
    const url = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?nologo=true?width=1024&height=1024&seed=${Math.floor(Math.random() * 1000)}&model=flux`;
    setImageUrl(url);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Image Generator</h1>
          <p className="text-gray-600">Transform your ideas into beautiful images using AI</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your image description..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
            <button
              onClick={generateImage}
              disabled={!prompt || isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Wand2 className="w-5 h-5" />
              Generate
            </button>
          </div>
        </div>

        {imageUrl && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="aspect-square w-full relative overflow-hidden rounded-lg">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
                </div>
              ) : (
                <img
                  src={imageUrl}
                  alt={prompt}
                  className="w-full h-full object-cover"
                  onError={() => setImageUrl('')}
                />
              )}
            </div>
            <div className="mt-4 text-sm text-gray-500">
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;