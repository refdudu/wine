interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ProductImage = ({ src, alt, className = "w-full h-full object-contain rounded-lg" }: ProductImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
    />
  );
};
