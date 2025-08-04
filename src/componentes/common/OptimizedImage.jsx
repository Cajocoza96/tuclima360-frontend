import React, { useState, useEffect } from 'react';

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

  // Estilos CSS-in-JS para shimmer (evita manipulación del DOM)
  const shimmerKeyframes = `
    @keyframes shimmer-slide {
      0% { transform: translateX(-100%) skewX(-12deg); }
      100% { transform: translateX(200%) skewX(-12deg); }
    }
  `;

  // Skeleton estilo ecommerce profesional - CORREGIDO
  const defaultSkeleton = (
    <div className={`
      relative w-full overflow-hidden
      bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 
      dark:from-gray-800 dark:via-gray-700 dark:to-gray-800
      ${aspectClass || 'h-48 md:h-64 lg:h-80'}
      ${className}
      ${skeletonClass}
    `}>
      {/* Shimmer effect - usando CSS-in-JS */}
      <style dangerouslySetInnerHTML={{ __html: shimmerKeyframes }} />
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-600/30 to-transparent transform -skew-x-12"
        style={{
          animation: 'shimmer-slide 2s ease-in-out infinite'
        }} 
      />

      {/* Contenido del skeleton */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 space-y-3">
        {/* Icono de imagen */}
        <div className="w-12 h-12 lg:w-16 lg:h-16 
                        bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center
                        animate-pulse">
          <svg className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400 dark:text-gray-500"
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
      ${aspectClass || 'h-48 md:h-64 lg:h-80'}
      ${className}
    `}>
      <div className="text-center p-3">
        <div className="text-xl mb-1 opacity-60">📷</div>
        <p className="text-xs text-red-600 dark:text-red-400 opacity-80">
          Error loading image
        </p>
      </div>
    </div>
  );

  // ESTRUCTURA CORREGIDA - Sin posicionamiento absoluto conflictivo
  return (
    <div className={`relative w-full overflow-hidden ${aspectClass}`}>
      {/* Mostrar skeleton mientras carga */}
      {showSkeleton && !imageLoaded && !imageError && imageSrc && defaultSkeleton}

      {/* Imagen principal */}
      {imageSrc && !imageError && (
        <img
          src={imageSrc}
          alt={alt}
          sizes={sizes}
          className={`
            w-full h-full object-cover transition-opacity duration-300
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
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