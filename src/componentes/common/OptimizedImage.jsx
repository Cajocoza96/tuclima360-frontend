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
      img.onload = () => setImageSrc(src);
      img.onerror = () => setImageError(true);
    } else {
      setImageSrc(src);
    }
  }, [src, preload]);

  // Handlers
  const handleLoad = () => setImageLoaded(true);
  const handleError = () => setImageError(true);

  // Props de la imagen
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
      ${aspectClass === '' ? 'min-h-[100vh]' : aspectClass}
      ${className}
      ${skeletonClass}
    `}>
      {/* Shimmer effect - animación de brillo */}
      <div className="fixed inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-600/30 to-transparent 
                      animate-[shimmer_2s_ease-in-out_infinite] transform -skew-x-12"
        style={{
          animation: 'shimmer 2s ease-in-out infinite',
          backgroundSize: '200% 100%'
        }} />

      {/* Contenido del skeleton */}
      <div className="fixed inset-0 flex flex-col items-center justify-center p-4 space-y-3">
        {/* Icono de imagen */}
        <div className="w-12 min-h-[100svh] 
                        bg-gray-300 dark:bg-gray-600">
        </div>
      </div>
    </div>
  );

  // Error fallback por defecto
  const defaultErrorFallback = (
    <div className={`
      bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 
      border border-red-200 dark:border-red-800 rounded-lg flex items-center justify-center
      ${aspectClass}
    `}>
      <div className="text-center p-3">
        <div className="text-xl mb-1 opacity-60">📷</div>
        <p className="text-xs text-red-600 dark:text-red-400 opacity-80">
          Error loading image
        </p>
      </div>
    </div>
  );

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
  }
};

export default OptimizedImage;