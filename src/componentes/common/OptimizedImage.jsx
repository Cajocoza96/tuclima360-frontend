import React, { useState, useEffect } from 'react';

// Agregar estilos CSS para el efecto shimmer
const shimmerStyles = `
  @keyframes shimmer {
    0% {
      transform: translateX(-100%) skewX(-12deg);
    }
    100% {
      transform: translateX(200%) skewX(-12deg);
    }
  }
`;

// Insertar estilos una sola vez
if (typeof document !== 'undefined' && !document.getElementById('shimmer-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'shimmer-styles';
  styleSheet.textContent = shimmerStyles;
  document.head.appendChild(styleSheet);
}

const OptimizedImage = ({
  src,
  alt,
  className = '',
  priority = 'auto', // 'high', 'low', 'auto'
  loading = 'lazy',   // 'eager', 'lazy'
  preload = false,    // true para imágenes críticas
  showSkeleton = true,
  skeletonClass = '',
  errorFallback = null,
  aspectRatio = 'auto', // 'square', 'video', 'portrait', 'landscape', 'auto'
  sizes,
  // NUEVAS PROPS PARA BACKGROUND IMAGE
  asBackground = false, // true para usar como background-image
  backgroundSize = 'cover', // 'cover', 'contain', 'auto', etc.
  backgroundPosition = 'center', // 'center', 'top', 'bottom', etc.
  backgroundRepeat = 'no-repeat', // 'no-repeat', 'repeat', etc.
  minHeight = '100svh', // altura mínima cuando se usa como background
  ...props
}) => {
  // ===== LÓGICA DEL HOOK INTEGRADA =====
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  // Efecto para manejar preload y src
  useEffect(() => {
    if (!src) return;

    if (preload) {
      // Precargar la imagen
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setImageLoaded(true);
      };
      img.onerror = () => setImageError(true);
    } else {
      setImageSrc(src);
      // Para background images, marcamos como cargada inmediatamente
      if (asBackground) {
        setImageLoaded(true);
      }
    }
  }, [src, preload, asBackground]);

  // Handlers para imágenes <img>
  const handleLoad = () => setImageLoaded(true);
  const handleError = () => setImageError(true);

  // Props de la imagen (solo para modo <img>)
  const imageProps = {
    loading: priority === 'high' ? 'eager' : loading,
    fetchPriority: priority,
    decoding: 'async',
    onLoad: handleLoad,
    onError: handleError
  };

  // ===== LÓGICA DE UI =====

  // Clases de aspect ratio
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    auto: ''
  };

  const aspectClass = aspectRatioClasses[aspectRatio] || '';

  // Skeleton estilo ecommerce profesional
  const defaultSkeleton = (
    <div className={`
      relative w-full overflow-hidden
      bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 
      dark:from-gray-800 dark:via-gray-700 dark:to-gray-800
      ${asBackground ? '' : (aspectClass === '' ? 'min-h-[200px] sm:min-h-[250px] lg:min-h-[300px] 2xl:min-h-[400px]' : aspectClass)}
      ${className}
      ${skeletonClass}
    `}
    style={asBackground ? { minHeight } : {}}>
      {/* Shimmer effect - animación de brillo */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-600/30 to-transparent 
                      animate-[shimmer_2s_ease-in-out_infinite] transform -skew-x-12"
        style={{
          animation: 'shimmer 2s ease-in-out infinite',
          backgroundSize: '200% 100%'
        }} />

      {/* Contenido del skeleton */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 space-y-3">
        {/* Icono de imagen */}
        <div className="w-12 h-12 lg:w-16 lg:h-16 2xl:w-20 2xl:h-20 
                        bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center
                        animate-pulse">
          <svg className="w-6 h-6 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10 text-gray-400 dark:text-gray-500"
            fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Barras de carga simuladas */}
        <div className="w-full max-w-[120px] space-y-2">
          <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-3/4 mx-auto"></div>
        </div>

        {/* Texto de carga */}
        <p className="text-xs text-gray-500 dark:text-gray-400 animate-pulse font-medium">
          Loading image...
        </p>
      </div>

      {/* Efecto de bordes sutiles */}
      <div className="absolute inset-0 border border-gray-200 dark:border-gray-700 rounded-lg pointer-events-none"></div>
    </div>
  );

  // Error fallback por defecto
  const defaultErrorFallback = (
    <div className={`
      bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 
      border border-red-200 dark:border-red-800 rounded-lg flex items-center justify-center
      ${aspectClass}
    `}
    style={asBackground ? { minHeight } : {}}>
      <div className="text-center p-3">
        <div className="text-xl mb-1 opacity-60">📷</div>
        <p className="text-xs text-red-600 dark:text-red-400 opacity-80">
          Error loading image
        </p>
      </div>
    </div>
  );

  // MODO BACKGROUND IMAGE
  if (asBackground) {
    const backgroundStyle = {
      backgroundImage: imageSrc && imageLoaded ? `url(${imageSrc})` : 'none',
      backgroundSize,
      backgroundPosition,
      backgroundRepeat,
      minHeight,
      width: '100%',
      height: '100%'
    };

    return (
      <div className="relative w-full h-full overflow-hidden">
        {/* Skeleton loader para background */}
        {showSkeleton && !imageLoaded && !imageError && defaultSkeleton}

        {/* Background image container */}
        {imageSrc && (
          <div
            className={`
              w-full h-full transition-opacity duration-300
              ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}
              ${className}
            `}
            style={backgroundStyle}
            role="img"
            aria-label={alt}
            {...props}
          />
        )}

        {/* Error fallback */}
        {imageError && (errorFallback || defaultErrorFallback)}
      </div>
    );
  }

  // MODO IMG TAG (comportamiento original)
  return (
    <div className="relative w-full overflow-hidden">
      {/* Skeleton loader */}
      {showSkeleton && !imageLoaded && !imageError && defaultSkeleton}

      {/* Imagen principal */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          sizes={sizes}
          className={`
            w-full h-auto object-cover transition-opacity duration-300
            ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}
            ${className}
          `}
          {...imageProps}
          {...props}
        />
      )}

      {/* Error fallback */}
      {imageError && (errorFallback || defaultErrorFallback)}
    </div>
  );
};

// ===== CONFIGURACIONES PREDEFINIDAS =====
export const IMAGE_CONFIGS = {
  // Imágenes críticas (logos, hero, mantenimiento)
  CRITICAL: {
    priority: 'high',
    loading: 'eager',
    preload: true
  },

  // Imágenes importantes en viewport inicial
  IMPORTANT: {
    priority: 'auto',
    loading: 'eager',
    preload: false
  },

  // Imágenes normales (lazy loading)
  NORMAL: {
    priority: 'auto',
    loading: 'lazy',
    preload: false
  },

  // Iconos y elementos pequeños
  ICON: {
    priority: 'low',
    loading: 'lazy',
    preload: false
  },

  // Configuraciones específicas para background images
  BACKGROUND_HERO: {
    asBackground: true,
    priority: 'high',
    loading: 'eager',
    preload: true,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100svh'
  },

  BACKGROUND_SECTION: {
    asBackground: true,
    priority: 'auto',
    loading: 'lazy',
    preload: false,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '50vh'
  }
};

export default OptimizedImage;