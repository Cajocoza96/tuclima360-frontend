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
  const scrollTimeoutRef = useRef(null);
  const recentInputFocus = useRef(false);
  const focusTimeoutRef = useRef(null);
  const initialViewportHeight = useRef(window.innerHeight);
  const isScrollingRef = useRef(false);

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
    
    console.log('Cerrando teclado - elemento activo:', activeElement.tagName, activeElement.type);
    
    // Cierra el teclado de forma más agresiva
    activeElement.blur();
    
    // Forzar el blur con un enfoque alternativo en caso de que el primero falle
    setTimeout(() => {
      if (document.activeElement === activeElement) {
        activeElement.blur();
        // Crear un elemento temporal para forzar el cambio de foco
        const tempElement = document.createElement('div');
        tempElement.style.position = 'absolute';
        tempElement.style.left = '-9999px';
        tempElement.tabIndex = -1;
        document.body.appendChild(tempElement);
        tempElement.focus();
        document.body.removeChild(tempElement);
      }
    }, delay || 50);
    
  }, [delay, excludeSelectors]);

  // Función más agresiva para detectar dispositivos móviles
  const isMobileDevice = useCallback(() => {
    // Detectar por User Agent
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    
    // Detectar por características táctiles
    const hasTouchSupport = (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
    
    // Detectar por tamaño de pantalla (incluso en modo de escritorio)
    const hasSmallScreen = (
      window.screen.width <= 1024 || 
      window.screen.height <= 1024 ||
      window.innerWidth <= 1024
    );
    
    // Si cualquiera de estos es verdadero, consideramos que es móvil
    return mobileRegex.test(userAgent) || hasTouchSupport || hasSmallScreen;
  }, []);

  // Detectar si hay un input activo con teclado
  const hasActiveInput = useCallback(() => {
    const activeElement = document.activeElement;
    return activeElement && activeElement.matches('input, textarea, [contenteditable="true"], select');
  }, []);

  // Detectar cambios en el viewport que indiquen teclado virtual
  const detectVirtualKeyboard = useCallback(() => {
    const currentHeight = window.innerHeight;
    const heightDifference = initialViewportHeight.current - currentHeight;
    
    // Si la altura se redujo significativamente, probablemente hay un teclado virtual
    return heightDifference > 100;
  }, []);

  useEffect(() => {
    // Solo aplicar en dispositivos móviles si touchOnly está habilitado
    if (touchOnly && !isMobileDevice()) {
      console.log('No es dispositivo móvil, hook deshabilitado');
      return;
    }

    const targetElement = container?.current || window;
    console.log('Hook habilitado para elemento:', targetElement === window ? 'window' : 'container');
    
    const handleScroll = () => {
      // Marcar que estamos haciendo scroll
      isScrollingRef.current = true;
      
      // Limpiar timeout anterior
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      const currentScrollTop = targetElement === window 
        ? window.pageYOffset || document.documentElement.scrollTop
        : targetElement.scrollTop;
      
      const scrollDifference = Math.abs(currentScrollTop - lastScrollTop.current);
      
      console.log('Scroll detectado:', {
        currentScrollTop,
        lastScrollTop: lastScrollTop.current,
        scrollDifference,
        hasActiveInput: hasActiveInput(),
        detectVirtualKeyboard: detectVirtualKeyboard(),
        recentInputFocus: recentInputFocus.current
      });
      
      // Si hay un input activo y movimiento de scroll real
      if (hasActiveInput() && scrollDifference > 1) {
        // En modo de escritorio, ser más agresivo
        const isDesktopMode = !detectVirtualKeyboard() && hasActiveInput();
        
        if (isDesktopMode) {
          console.log('Modo de escritorio detectado, cerrando teclado inmediatamente');
          closeKeyboard();
        } else {
          // Comportamiento normal para móvil estándar
          if (!recentInputFocus.current || scrollDifference > 10) {
            console.log('Cerrando teclado por scroll normal');
            closeKeyboard();
          }
        }
      }
      
      lastScrollTop.current = currentScrollTop;
      
      // Resetear el flag de scroll después de un breve delay
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        recentInputFocus.current = false;
      }, 150);
    };

    // Listener para detectar cuando se hace focus en un input
    const handleFocusIn = (e) => {
      const isInputElement = e.target.matches(
        'input, textarea, [contenteditable="true"], select'
      );
      
      if (isInputElement) {
        console.log('Focus en input detectado:', e.target);
        recentInputFocus.current = true;
        
        // Actualizar la altura de referencia cuando se hace focus
        setTimeout(() => {
          initialViewportHeight.current = window.innerHeight;
        }, 300); // Wait for keyboard to appear
        
        // Limpiar timeout anterior si existe
        if (focusTimeoutRef.current) {
          clearTimeout(focusTimeoutRef.current);
        }
        
        // Resetear el flag después de un tiempo más corto
        focusTimeoutRef.current = setTimeout(() => {
          recentInputFocus.current = false;
          console.log('Flag de focus reciente reseteado');
        }, 500); // Tiempo más corto para ser más responsive
      }
    };

    // Listener para blur
    const handleFocusOut = (e) => {
      if (e.target.matches('input, textarea, [contenteditable="true"], select')) {
        console.log('Blur en input detectado');
        // Resetear inmediatamente el flag cuando se pierde el focus
        recentInputFocus.current = false;
        
        // Actualizar la altura de referencia cuando se cierra el teclado
        setTimeout(() => {
          initialViewportHeight.current = Math.max(window.innerHeight, initialViewportHeight.current);
        }, 300);
      }
    };

    // Event listeners
    targetElement.addEventListener('scroll', handleScroll, { 
      passive: true 
    });
    
    document.addEventListener('focusin', handleFocusIn, { passive: true });
    document.addEventListener('focusout', handleFocusOut, { passive: true });

    // Listener adicional para touchstart que puede ayudar en modo de escritorio
    const handleTouchStart = () => {
      if (hasActiveInput() && !recentInputFocus.current) {
        console.log('Touch detectado con input activo, preparando para cerrar teclado');
        // Pequeño delay para permitir que el scroll se registre
        setTimeout(() => {
          if (isScrollingRef.current) {
            closeKeyboard();
          }
        }, 50);
      }
    };

    if (isMobileDevice()) {
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
    }

    return () => {
      targetElement.removeEventListener('scroll', handleScroll);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      
      if (isMobileDevice()) {
        document.removeEventListener('touchstart', handleTouchStart);
      }
      
      // Limpiar timeouts
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [container, touchOnly, closeKeyboard, isMobileDevice, hasActiveInput, detectVirtualKeyboard]);
}