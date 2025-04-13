import { animate } from "motion";
import { useMotionValue } from "motion/react";
import { useEffect, useState } from "react";

export const useAnimatedText = (text: string) => {
  const [prevText, setPrevText] = useState(text);
  const [isSameText, setIsSameText] = useState(true);
  const [cursor, setCursor] = useState(0);
  const animatedCursor = useMotionValue(0);

  if (text !== prevText) {
    setPrevText(text);
    setIsSameText(text.startsWith(prevText));

    if (!text.startsWith(prevText)) {
      setCursor(0);
    }
  }

  useEffect(() => {
    if (!isSameText) {
      animatedCursor.jump(0);
    }
    const controls = animate(animatedCursor, text.length, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (value) => {
        setCursor(Math.floor(value));
      },
    });
    return () => {
      controls.stop();
    };
  }, [animatedCursor, isSameText, text]);

  return text.slice(0, cursor);
};
