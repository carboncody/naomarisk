import clsx from 'clsx';
import { AnimatePresence, motion, type Variants } from 'framer-motion';

interface DropdownAnimationProps {
  isOpen: boolean;
  children: React.ReactNode;
  speed?: 'fast' | 'slow';
  className?: string;
  initial?: boolean;
  layout?: boolean;
}

export function DropdownAnimation({
  isOpen,
  children,
  className,
  speed = 'fast',
  initial = false,
  layout = false,
}: DropdownAnimationProps) {
  const dropdownVariants: Variants = {
    hidden: {
      opacity: 0,
      height: 0,
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: speed === 'fast' ? 0.1 : 0.2,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.1,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <AnimatePresence initial={initial}>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          layout={layout}
          variants={dropdownVariants}
          className={clsx('overflow-clip', className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
