import { revalidatePath } from "next/cache";

/**
 * Revalidates public site routes whenever content is published or updated in the Admin panel.
 */
export function revalidatePublicSite(paths?: string[]) {
  const defaultPaths = [
    "/",
    "/shop",
    "/collections",
    "/occasions",
    "/customized",
    "/visit-our-store",
    "/contact",
    "/about-us",
    "/api/silver-rate",
  ];

  const targets = paths && paths.length > 0 ? paths : defaultPaths;

  for (const path of targets) {
    try {
      revalidatePath(path);
    } catch (err) {
      console.error(`Failed to revalidate path ${path}:`, err);
    }
  }
}
