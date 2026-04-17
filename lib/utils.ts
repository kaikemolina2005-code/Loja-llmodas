import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAssetPath = (path: string) => {
  if (path.startsWith('http') || path.startsWith('//')) {
    return path;
  }

  return path.startsWith('/') ? path : `/${path}`;
};
