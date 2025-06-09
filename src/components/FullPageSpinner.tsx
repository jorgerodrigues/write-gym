import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Spinner } from "./Spinner";

export interface FullPageSpinnerProps {
  /** Controls whether the spinner is visible */
  show: boolean;
  /** Additional CSS classes to be applied to the overlay */
  className?: string;
  /** Size of the spinner */
  spinnerSize?: string;
}

export const FullPageSpinner: React.FC<FullPageSpinnerProps> = ({
  show,
  className = "",
  spinnerSize = "w-12 h-12",
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-slate-300 bg-opacity-50 backdrop-blur-sm ${className}`}
          role="status"
          aria-label="Loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
          >
            <Spinner className={`text-text-dark ${spinnerSize}`} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
