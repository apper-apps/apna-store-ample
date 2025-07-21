import React from "react";

const Loading = ({ className = "" }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gray-200 rounded-lg shimmer w-48"></div>
        <div className="h-10 bg-gray-200 rounded-lg shimmer w-32"></div>
      </div>

      {/* Category skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col items-center p-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full shimmer mb-2"></div>
            <div className="h-4 bg-gray-200 rounded shimmer w-16"></div>
          </div>
        ))}
      </div>

      {/* Product grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="h-48 bg-gray-200 rounded-lg shimmer mb-4"></div>
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded shimmer w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded shimmer w-full"></div>
              <div className="h-4 bg-gray-200 rounded shimmer w-1/2"></div>
              <div className="flex justify-between items-center mt-4">
                <div className="h-6 bg-gray-200 rounded shimmer w-20"></div>
                <div className="h-8 bg-gray-200 rounded shimmer w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;