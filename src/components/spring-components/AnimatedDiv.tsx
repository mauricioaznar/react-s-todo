import React from "react";
import { animated, Spring } from "react-spring";

interface AnimatedDivProps {
  children: React.ReactNode;
}

export default function AnimatedDiv(props: AnimatedDivProps) {
  const { children } = props;

  return (
    <Spring
      config={{
        duration: 500,
      }}
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
    >
      {(styles) => {
        return (
          <animated.div
            style={{
              ...styles,
            }}
          >
            {children}
          </animated.div>
        );
      }}
    </Spring>
  );
}
