import type { ImgHTMLAttributes, SyntheticEvent } from "react";
import heroImage from "../../assets/hero.png";

interface FallbackImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string | null;
}

export default function FallbackImage({ src, ...props }: FallbackImageProps) {
  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;

    if (image.dataset.fallbackApplied) {
      return;
    }

    image.dataset.fallbackApplied = "true";
    image.src = heroImage;
  };

  return (
    <img
      {...props}
      src={src?.trim() || heroImage}
      onError={handleError}
    />
  );
}
