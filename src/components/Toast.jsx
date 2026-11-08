import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, AlertOctagon, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-3">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isWarning = toast.type === 'warning';
          const isDanger  = toast.type === 'danger';

          /* Background glass style per type */
          const bgStyle = isSuccess
            ? { background: 'rgba(49, 76, 66, 0.92)', borderColor: 'rgba(185, 243, 232, 0.25)' }
            : isWarning
            ? { background: 'rgba(233, 164, 91, 0.18)', borderColor: 'rgba(233, 164, 91, 0.45)' }
            : isDanger
            ? { background: 'rgba(198, 107, 78, 0.20)', borderColor: 'rgba(198, 107, 78, 0.50)' }
            : { background: 'rgba(16, 27, 45, 0.90)', borderColor: 'rgba(242, 232, 216, 0.20)' };

          const iconColor = isSuccess
            ? 'text-[#B9F3E8]'
            : isWarning
            ? 'text-[#E9A45B]'
            : isDanger
            ? 'text-[#C66B4E]'
            : 'text-[#E9A45B]';

          const titleColor = isSuccess
            ? 'text-[#FFFDF7]'
            : isWarning
            ? 'text-[#F2E8D8]'
            : isDanger
            ? 'text-[#F2E8D8]'
            : 'text-[#FFFDF7]';

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-luxury backdrop-blur-xl"
              style={bgStyle}
            >
              <div className={`mt-0.5 shrink-0 ${iconColor}`}>
                {isSuccess && <CheckCircle2 className="w-5 h-5" />}
                {isWarning && <AlertTriangle className="w-5 h-5" />}
                {isDanger  && <AlertOctagon  className="w-5 h-5" />}
                {!isSuccess && !isWarning && !isDanger && <Info className="w-5 h-5" />}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className={`text-xs font-bold tracking-tight leading-snug font-sans ${titleColor}`}>
                  {toast.title}
                </h4>
                {toast.message && (
                  <p className="text-xs mt-0.5 text-[#F2E8D8]/65 leading-relaxed">
                    {toast.message}
                  </p>
                )}
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 p-1 rounded-lg opacity-50 hover:opacity-100 hover:bg-white/10 transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4 text-[#F2E8D8]" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
