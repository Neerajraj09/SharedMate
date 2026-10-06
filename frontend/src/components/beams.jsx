import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const AnimatedBeans = () => {
  const userCount = 5; // Number of users
  const containerRef = useRef(null);
  const SharedMateRef = useRef(null);
  const userRefs = useRef(Array(userCount).fill(null));

  const [paths, setPaths] = useState([]);

  useEffect(() => {
    if (SharedMateRef.current && userRefs.current[0]) {
      // Get positions of SharedMate logo and users
      const SharedMateRect = SharedMateRef.current.getBoundingClientRect();
      const userRects = userRefs.current.map((ref) => ref.getBoundingClientRect());

      const pathsData = userRects.map((userRect, index) => {
        const startX = userRect.left + userRect.width / 2;
        const startY = userRect.top + userRect.height / 2;
        const endX = SharedMateRect.left + SharedMateRect.width / 2;
        const endY = SharedMateRect.top + SharedMateRect.height / 2;

        // Control point for curve (slight upward curvature)
        const controlX = (startX + endX) / 2;
        const controlY = Math.min(startY, endY) - 30;

        return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
      });

      setPaths(pathsData);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Animated Lines (Transaction Flow) */}
      {paths.map((path, index) => (
        <motion.svg
          key={index}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <motion.path
            d={path}
            stroke="#00f" // Transaction line color
            strokeWidth="2"
            fill="transparent"
            animate={{
              strokeDasharray: [0, 100],
              strokeDashoffset: [100, 0],
            }}
            transition={{
              duration: 3,
              delay: index * 0.5,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      ))}

      {/* Central "SharedMate" Point */}
      <div
        ref={SharedMateRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60px",
          height: "60px",
          backgroundColor: "#fff",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          fontSize: "1.5rem",
        }}
      >
        {/* Your logo here */}
        <img
          src="path_to_logo.png" // Add your logo path here
          alt="SharedMate"
          style={{
            width: "40px", // Adjust logo size
            height: "40px",
            objectFit: "contain",
          }}
        />
      </div>

      {/* User Points (Representing Users) */}
      {Array.from({ length: userCount }).map((_, index) => (
        <div
          key={index}
          ref={(el) => (userRefs.current[index] = el)}
          style={{
            position: "absolute",
            top: `${50 + 40 * Math.sin((index * 2 * Math.PI) / userCount)}%`,
            left: `${50 + 40 * Math.cos((index * 2 * Math.PI) / userCount)}%`,
            width: "40px",
            height: "40px",
            backgroundColor: "#fff",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            fontSize: "1.2rem",
            border: "2px solid #00f",
          }}
        >
          {/* User Logo (Representing User) */}
          <img
            src="path_to_user_logo.png" // Add user logo path here
            alt={`User ${index + 1}`}
            style={{
              width: "24px", // Adjust user logo size
              height: "24px",
              objectFit: "contain",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default AnimatedBeans;
