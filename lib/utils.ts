import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const basePath = '/ai-site2';

/**
 * Prepends the basePath to an absolute path.
 */
export const getAssetPath = (path: string) => {
  if (path.startsWith('http') || path.startsWith('//')) {
    return path;
  }
  
  // Remove duplicate base path if already present
  const cleanPath = path.startsWith(basePath) 
    ? path.slice(basePath.length) 
    : path;
    
  return `${basePath}${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}`;
};
