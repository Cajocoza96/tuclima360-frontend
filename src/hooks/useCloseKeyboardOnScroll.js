import { useEffect, useCallback, useRef } from 'react';

export function useCloseKeyboardOnScroll(options = {}) {
  const {
    container = null, // ref del contenedor, null = window
    touchOnly = true, // solo en dispositivos táctiles
    delay = 0, // delay antes de cerrar (ms)
    excludeSelectors = [] // selectores a excluir
  } = options;

  // Referencias para controlar el estado
  const lastScrollTop = useRef(0);
  const isAtBottom = useRef(false);
  const recentInputFocus = useRef(false);
  const focusTimeoutRef = useRef(null);
  const initialViewportHeight = useRef(null);

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

  // Función mejorada para detectar dispositivos móviles/táctiles
  const isTouchDevice = useCallback(() => {
    // Método más robusto que funciona mejor con modo de escritorio
    const hasTouchSupport = (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
    
    const isMobileUserAgent = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Detectar cambios en el viewport height como indicador de teclado virtual
    const currentViewportHeight = window.visualViewport ? 
      window.visualViewport.height : window.innerHeight;
    
    if (initialViewportHeight.current === null) {
      initialViewportHeight.current = currentViewportHeight;
    }
    
    const hasVirtualKeyboard = initialViewportHeight.current - currentViewportHeight > 150;
    
    // Si detectamos un teclado virtual, definitivamente es un dispositivo móvil
    if (hasVirtualKeyboard) return true;
    
    // Combinar diferentes métodos de detección para mayor precisión
    return hasTouchSupport || isMobileUserAgent;
  }, []);

  // Función para verificar si estamos en el fondo del scroll
  const checkIfAtBottom = useCallback((element) => {
    if (element === window) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      return scrollTop + windowHeight >= documentHeight - 10; // 10px de tolerancia
    } else {
      return element.scrollTop + element.clientHeight >= element.scrollHeight - 10;
    }
  }, []);

  // Función para detectar si hay un teclado virtual activo
  const hasVirtualKeyboard = useCallback(() => {
    if (window.visualViewport) {
      return window.visualViewport.height < window.innerHeight * 0.85;
    }
    
    // Fallback: comparar con la altura inicial
    const currentHeight = window.innerHeight;
    if (initialViewportHeight.current) {
      return initialViewportHeight.current - currentHeight > 150;
    }
    
    return false;
  }, []);

  useEffect(() => {
    // Guardar la altura inicial del viewport
    if (initialViewportHeight.current === null) {
      initialViewportHeight.current = window.visualViewport ? 
        window.visualViewport.height : window.innerHeight;
    }

    // Solo aplica en dispositivos táctiles si está habilitado
    if (touchOnly && !isTouchDevice()) {
      return;
    }

    const targetElement = container?.current || window;
    
    const handleScroll = () => {
      // Solo proceder si realmente hay un teclado virtual activo
      const keyboardActive = hasVirtualKeyboard();
      if (!keyboardActive) return;

      const currentScrollTop = targetElement === window 
        ? window.pageYOffset || document.documentElement.scrollTop
        : targetElement.scrollTop;
      
      // Actualizar si estamos en el fondo
      isAtBottom.current = checkIfAtBottom(targetElement);
      
      // Detectar movimiento de scroll real (no solo bounce del navegador)
      const hasScrollMovement = Math.abs(currentScrollTop - lastScrollTop.current) > 3;
      
      // Condiciones más estrictas para modo de escritorio
      const shouldCloseKeyboard = (
        hasScrollMovement && (
          !isAtBottom.current || 
          (!recentInputFocus.current && currentScrollTop > lastScrollTop.current)
        )
      );
      
      if (shouldCloseKeyboard) {
        closeKeyboard();
      }
      
      // Resetear el flag de focus reciente después de un scroll real
      if (hasScrollMovement) {
        recentInputFocus.current = false;
      }
      
      lastScrollTop.current = currentScrollTop;
    };

    // Listener para detectar cuando se hace focus en un input
    const handleFocusIn = (e) => {
      const isInputElement = e.target.matches(
        'input, textarea, [contenteditable="true"], select'
      );
      
      if (isInputElement) {
        // Marcar que hay un focus reciente
        recentInputFocus.current = true;
        
        // Limpiar timeout anterior si existe
        if (focusTimeoutRef.current) {
          clearTimeout(focusTimeoutRef.current);
        }
        
        // Resetear el flag después de un tiempo (más corto en modo de escritorio)
        const graceTime = isTouchDevice() ? 800 : 1200;
        focusTimeoutRef.current = setTimeout(() => {
          recentInputFocus.current = false;
        }, graceTime);
      }
    };

    // Listener para detectar cambios en el viewport (útil para detectar teclado virtual)
    const handleViewportChange = () => {
      // Actualizar la referencia de altura cuando cambia el viewport
      if (window.visualViewport) {
        const currentHeight = window.visualViewport.height;
        if (Math.abs(currentHeight - initialViewportHeight.current) > 100) {
          // Se detectó un cambio significativo, probablemente el teclado
          setTimeout(() => {
            initialViewportHeight.current = Math.max(currentHeight, initialViewportHeight.current);
          }, 100);
        }
      }
    };

    // Usar passive para mejor rendimiento en scroll
    targetElement.addEventListener('scroll', handleScroll, { 
      passive: true 
    });
    
    // Escuchar eventos de focus en todo el documento
    document.addEventListener('focusin', handleFocusIn, { passive: true });

    // Escuchar cambios en el visual viewport si está disponible
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
    }

    return () => {
      targetElement.removeEventListener('scroll', handleScroll);
      document.removeEventListener('focusin', handleFocusIn);
      
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange);
      }
      
      // Limpiar timeout si existe
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }
    };
  }, [container, touchOnly, closeKeyboard, checkIfAtBottom, isTouchDevice, hasVirtualKeyboard]);
}