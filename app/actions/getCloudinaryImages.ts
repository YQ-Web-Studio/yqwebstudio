"use server";

export async function getCloudinaryImages(folder: string): Promise<string[]> {
  const cloudinaryName = process.env.CLOUDINARY_NAME;
  const cloudinaryKey = process.env.CLOUDINARY_KEY;
  const cloudinarySecret = process.env.CLOUDINARY_SECRET;

  if (!cloudinaryName || !cloudinaryKey || !cloudinarySecret) {
    console.error("Cloudinary credentials are not configured in environment variables.");
    return [];
  }

  try {
    const auth = Buffer.from(`${cloudinaryKey}:${cloudinarySecret}`).toString("base64");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryName}/resources/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${auth}`,
        },
        body: JSON.stringify({
          // Search for files specifically inside yqwebstudio/<folder>
          expression: `folder:yqwebstudio/${folder}`,
          max_results: 100,
        }),
        next: { revalidate: 3600 }, // Cache results for 1 hour
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Cloudinary search API returned status ${response.status}:`, errorText);
      return [];
    }

    const data = await response.json();
    if (data.resources && Array.isArray(data.resources)) {
      // Sort alphabetically by public_id to ensure chronological order (earliest first)
      const sorted = [...data.resources].sort((a: any, b: any) => 
        a.public_id.localeCompare(b.public_id)
      );
      return sorted.map((resource: any) => resource.secure_url);
    }

    return [];
  } catch (error) {
    console.error("Failed to fetch images from Cloudinary:", error);
    return [];
  }
}
