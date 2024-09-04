import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import "./Start.css";

const AncientWheel: React.FC<{ onChangePage: () => void }> = ({
  onChangePage,
}) => {
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
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className="spin-button"
        >
          Spin
        </button>
      </div>
    </>
  );
};

export default AncientWheel;
