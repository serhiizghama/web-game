import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import "./Start.css";

const AncientWheel: React.FC<{
  onChangePage: () => void;
  userPoints: number;
}> = ({ onChangePage, userPoints }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [waitForChangePage, setWaitForChangePage] = useState(false);

  const spinWheel = () => {
    if (!isSpinning) {
      setWaitForChangePage(true);
      setIsSpinning(true);
      const newRotation = rotation + 1080 + Math.random() * 720;
      setRotation(newRotation);
    }
  };

  useEffect(() => {
    if (!isSpinning && waitForChangePage) {
      onChangePage();
    }
  }, [isSpinning, waitForChangePage, onChangePage]);

  return (
    <>
      <div className="container">
        <div className="score">
          <h3>
            YOU HAVE <span className="counter">{userPoints} $JDC</span>
          </h3>
        </div>

        <motion.div
          className="ancient-wheel"
          animate={{ rotate: rotation }}
          transition={{ duration: 5, ease: "easeOut" }}
          onAnimationComplete={() => setIsSpinning(false)}
        >
          {[...Array(24)].map((_, index) => (
            <div
              key={index}
              className="wheel-sector"
              style={{ transform: `rotate(${index * 15}deg)` }}
            />
          ))}
          <div className="wheel-border" />
          <div className="wheel-inner-border" />
        </motion.div>
        {(!isSpinning && (
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="spin-button"
          >
            NEW GAME
          </button>
        )) || <h3 className="partner-selection">PARTNER SELECTION</h3>}
      </div>
      <div className="container"></div>
    </>
  );
};

export default AncientWheel;
