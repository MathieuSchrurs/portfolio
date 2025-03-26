import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 mb-6">
          Tailwind CSS Test
        </h1>

        {/* Color Test */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <div className="h-12 bg-red-500 rounded flex items-center justify-center text-white font-bold">
            Red
          </div>
          <div className="h-12 bg-blue-500 rounded flex items-center justify-center text-white font-bold">
            Blue
          </div>
          <div className="h-12 bg-green-500 rounded flex items-center justify-center text-white font-bold">
            Green
          </div>
          <div className="h-12 bg-yellow-500 rounded flex items-center justify-center text-white font-bold">
            Yellow
          </div>
        </div>

        {/* Typography Test */}
        <p className="text-gray-600 mb-4">
          This text should be gray (text-gray-600)
        </p>
        <p className="text-blue-500 mb-4">
          This text should be blue (text-blue-500)
        </p>

        {/* Utility Classes Test */}
        <div className="flex justify-between mb-6">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300">
            Hover Me
          </button>
          <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
            <span className="text-xl">🔍</span>
          </div>
        </div>

        {/* Border and Shadow Test */}
        <div className="p-4 border-2 border-dashed border-purple-500 rounded-lg shadow-lg">
          <p className="font-semibold text-center">
            This box has a purple dashed border and a shadow
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;


