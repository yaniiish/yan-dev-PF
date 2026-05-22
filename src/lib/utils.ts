import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Compose des classes Tailwind en résolvant les conflits.
 * Ex: cn("p-2", condition && "p-4") → "p-4" (tailwind-merge supprime le doublon).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
