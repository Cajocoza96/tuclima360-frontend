import { useEffect, useCallback } from 'react';

export function useCloseKeyboardOnScroll(options = {}) {
  const {
    container = null, // ref del contenedor, null = window
    touchOnly = true, // solo en dispositivos táctiles
    delay = 0, // delay antes de cerrar (ms)
    excludeSelectors = [] // selectores a excluir
  } = options;

  const closeKeyboard = useCallback(() => {
    const activeElement = document.activeElement;
    
    if (!activeElement) return;
    
    // Verifica si es un elemento de entrada
    const isInputElement = activeElement.matches(
      'input, textarea, [contenteditable="true"], select'
    );
    
    if (!isInputElement) return;
    
    // Verifica exclusiones
    const isExcluded = excludeSelectors.some(selector => 
      activeElement.matches(selector)
    );
    
    if (isExcluded) return;
    
    // Cierra el teclado
    if (delay > 0) {
      setTimeout(() => activeElement.blur(), delay);
    } else {
      activeElement.blur();
    }
  }, [delay, excludeSelectors]);

  useEffect(() => {
    // Solo aplica en dispositivos táctiles si está habilitado
    if (touchOnly) {
      const isTouchDevice = 'ontouchstart' in window || 
                            navigator.maxTouchPoints > 0 ||
                            /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (!isTouchDevice) return;
    }

    const targetElement = container?.current || window;
    
    const handleScroll = () => {
      closeKeyboard();
    };

    // Usa passive para mejor rendimiento
    targetElement.addEventListener('scroll', handleScroll, { 
      passive: true 
    });

    return () => {
      targetElement.removeEventListener('scroll', handleScroll);
    };
  }, [container, touchOnly, closeKeyboard]);
}

