import React, { useState } from "react";
import { useSpring, animated, useTransition } from "@react-spring/web";

interface FullScreenLoaderProps {
  message?: string;
  timeout?: number;
  type?: "spinner" | "period";
}

const useFullScreenLoader = (
  show: boolean,
  timeout?: number,
  type?: "spinner" | "period"
) => {
  const [error, setError] = useState(false);
  const loaderSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: show && !error ? 1 : 0 },
  });

  React.useEffect(() => {
    if (timeout) {
      const timeoutId = setTimeout(() => {
        setError(true);
      }, timeout);

      return () => clearTimeout(timeoutId);
    }
  }, [timeout]);

  const handleClose = () => {
    setError(false);
  };

  const dots = [".", "..", "..."];
  const [, setIndex] = useState(0);
  const [transitions] = useTransition(dots, () => ({
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
  }));

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((index) => (index + 1) % dots.length);
    }, 500);

    return () => clearInterval(intervalId);
  }, [dots.length]);

  return {
    error,
    loaderSpring,
    handleClose,
    transitions,
  };
};

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
  timeout = 3000,
  type = "period",
  message = "Loading",
}) => {
  const { error, loaderSpring, handleClose, transitions } = useFullScreenLoader(
    true,
    timeout,
    type
  );

  const loaders = {
    spinner: null,
    period: (
      <>
        <div className="text-4xl font-bold text-gray-800">{message}</div>
        {transitions((style, item, _, key) => (
          <animated.div key={key} style={style}>
            {item}
          </animated.div>
        ))}
      </>
    ),
  };

  return (
    <animated.div
      className="fixed top-0 left-0 w-full h-full bg-gray-50 z-50 flex items-center justify-center"
      style={loaderSpring}
    >
      {error ? (
        <div className="text-center">
          <p className="text-red-500 text-2xl font-bold">Error</p>
          <p className="text-red-400 text-lg">
            There was an error loading the content
          </p>
          <button
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      ) : (
        loaders[type || "spinner"]
      )}
    </animated.div>
  );
};

export default FullScreenLoader;
