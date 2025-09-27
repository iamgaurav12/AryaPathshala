import React, { useEffect, useRef } from 'react';
import { Dialog } from '@headlessui/react';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = ''
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
    full: 'max-w-6xl'
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (closeOnEscape && e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      setTimeout(() => modalRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      previousFocusRef.current?.focus();
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={handleOverlayClick} aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          ref={modalRef}
          tabIndex={-1}
          className={`relative bg-black rounded-2xl shadow-2xl border border-gray-800 w-full ${sizeClasses[size]} transform transition-all duration-300 ${className}`}
        >
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <Dialog.Title className="text-xl font-semibold text-yellow-400">{title}</Dialog.Title>
              {showCloseButton && (
                <button onClick={onClose} className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-800 rounded-lg transition-all" aria-label="Close modal">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>
          )}
          <div className="p-6">{children}</div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title = 'Confirm Action', message = 'Are you sure?', confirmText = 'Confirm', cancelText = 'Cancel', type = 'default' }) => {
  const typeStyles = {
    default: { confirmButton: 'bg-yellow-500 hover:bg-yellow-600 text-black', icon: '❓', iconBg: 'bg-yellow-500/20 text-yellow-500' },
    danger: { confirmButton: 'bg-red-600 hover:bg-red-700 text-white', icon: '⚠️', iconBg: 'bg-red-900/20 text-red-500' },
    success: { confirmButton: 'bg-green-600 hover:bg-green-700 text-white', icon: '✅', iconBg: 'bg-green-900/20 text-green-500' }
  };
  const currentStyle = typeStyles[type];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="small" title={title}>
      <div className="text-center">
        <div className={`mx-auto flex items-center justify-center w-12 h-12 rounded-full ${currentStyle.iconBg} mb-4`}>
          <span className="text-2xl">{currentStyle.icon}</span>
        </div>
        <p className="text-gray-400 mb-6">{message}</p>
        <div className="flex space-x-3 justify-center">
          <button onClick={onClose} className="px-4 py-2 text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">{cancelText}</button>
          <button onClick={() => { onConfirm(); onClose(); }} className={`px-4 py-2 rounded-lg transition-colors ${currentStyle.confirmButton}`}>{confirmText}</button>
        </div>
      </div>
    </Modal>
  );
};

export const YouTubePermissionModal = ({ isOpen, onClose, onConfirm, videoTitle = 'Video Lecture' }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="medium" title="Open YouTube Video">
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-red-900/20 mb-4">
        <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{videoTitle}</h3>
      <p className="text-gray-400 mb-6">This will open the video lecture in YouTube in a new tab.</p>
      <div className="bg-yellow-500/10 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <span className="text-yellow-500 text-lg">💡</span>
          <p className="text-sm text-yellow-400 text-left"><strong>Tip:</strong> For the best learning experience, take notes while watching and complete practice questions afterward.</p>
        </div>
      </div>
      <div className="flex space-x-3 justify-center">
        <button onClick={onClose} className="px-6 py-2 text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">Cancel</button>
        <button onClick={() => { onConfirm(); onClose(); }} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center space-x-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          <span>Open YouTube</span>
        </button>
      </div>
    </div>
  </Modal>
);

export default Modal;
