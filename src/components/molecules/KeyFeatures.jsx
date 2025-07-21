import React from "react";
import ApperIcon from "@/components/ApperIcon";

const KeyFeatures = () => {
  const features = [
    {
      icon: "RotateCcw",
      title: "7-day Easy Returns",
      description: "Hassle-free returns within 7 days of purchase"
    },
    {
      icon: "Headphones",
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your needs"
    },
    {
      icon: "ShieldCheck",
      title: "100% Quality Products",
      description: "Guaranteed authentic and high-quality products"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the best shopping with our commitment to quality, service, and your satisfaction
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card p-8 text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                <ApperIcon 
                  name={feature.icon} 
                  size={28} 
                  className="text-white"
                />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;