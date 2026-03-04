import { useEffect, useState } from "react";

export const useImageSize = (imageUrl: string) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setSize({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [imageUrl]);

  return size;
};
