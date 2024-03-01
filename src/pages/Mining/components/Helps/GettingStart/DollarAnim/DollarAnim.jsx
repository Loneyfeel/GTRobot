import React from "react";
import DollarAnimItem from "./DollarAnimItem";
import Dollar1 from "../../../../assets/HelpsAnimations/GettingStart/dollar-1.svg";
import Dollar2 from "../../../../assets/HelpsAnimations/GettingStart/dollar-2.svg";

const DollarAnim = () => {
  return (
    <>
      <DollarAnimItem
        imageSrc={Dollar1}
        startPosition={{ top: 50, left: 20 }}
        delay={0.3}
      />
      <DollarAnimItem
        imageSrc={Dollar1}
        startPosition={{ top: 10, left: 120 }}
        delay={3}
      />
      <DollarAnimItem
        imageSrc={Dollar1}
        startPosition={{ top: 120, left: 40 }}
        delay={0.9}
      />
      <DollarAnimItem
        imageSrc={Dollar1}
        startPosition={{ top: 70, left: 220 }}
        delay={3.6}
      />
      <DollarAnimItem
        imageSrc={Dollar1}
        startPosition={{ top: 150, left: 250 }}
        delay={2.4}
      />
      <DollarAnimItem
        imageSrc={Dollar2}
        startPosition={{ top: 20, left: 30 }}
        delay={2.7}
      />
      <DollarAnimItem
        imageSrc={Dollar2}
        startPosition={{ top: 80, left: 250 }}
        delay={0.6}
      />
      <DollarAnimItem
        imageSrc={Dollar2}
        startPosition={{ top: 120, left: 130 }}
        delay={3.3}
      />
      <DollarAnimItem
        imageSrc={Dollar2}
        startPosition={{ top: 140, left: 10 }}
        delay={2.1}
      />
      <DollarAnimItem
        imageSrc={Dollar2}
        startPosition={{ top: 10, left: 240 }}
        delay={3.9}
      />
    </>
  );
};

export default DollarAnim;
