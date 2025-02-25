"use client";

import React, { useEffect, useState } from "react";

const LoadingWithoutImage: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);


  if (!isVisible) return null;
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50" style={{ backgroundColor: "transparent", }}>
            <div className="w-24 h-24 border-dashed border-gray-200 rounded-full animate-spin" style={{ borderWidth: "14px" ,borderColor: "#f8d3c3"}}></div>
        </div>
    );
};

export default LoadingWithoutImage;