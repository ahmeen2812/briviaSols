import fs from "node:fs";
import path from "node:path";

/**
 * Checks on the server whether local team image assets currently exist inside `public/`.
 * Passing an availability map to client components ensures:
 * - Zero broken-image 404/400 network console errors before real photographs are added.
 * - Automatic instant rendering via Next.js `<Image>` as soon as files are placed in `public/images/team/`.
 */
export function resolveAvailablePublicImages(imagePaths: readonly string[]): Record<string, boolean> {
  const publicRoot = path.join(process.cwd(), "public");
  const availability: Record<string, boolean> = {};

  for (const imagePath of imagePaths) {
    if (!imagePath) continue;
    // External URLs are assumed available and handled with Image onError fallback
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      availability[imagePath] = true;
      continue;
    }

    const normalizedRelative = imagePath.replace(/^\/+/, "");
    const resolvedPath = path.join(publicRoot, normalizedRelative);
    // Prevent path traversal outside publicRoot
    if (!resolvedPath.startsWith(publicRoot)) {
      availability[imagePath] = false;
      continue;
    }

    try {
      availability[imagePath] = fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile();
    } catch {
      availability[imagePath] = false;
    }
  }

  return availability;
}
