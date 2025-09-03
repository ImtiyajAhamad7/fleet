import axios from "axios";

export async function getLatLongFromPincode(
  pincode: string
): Promise<{ lat: number; lon: number } | null> {
  const SERPAPI_KEY = process.env.SERPAPI_KEY;
  try {
    if (!SERPAPI_KEY) throw new Error("Missing SERPAPI_KEY in environment");

    const resp = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google_maps",
        type: "search",
        q: `${pincode}, India`,
        api_key: SERPAPI_KEY,
      },
    });

    // 1️⃣ Check place_results first
    if (resp.data.place_results?.gps_coordinates) {
      const { latitude, longitude } = resp.data.place_results.gps_coordinates;
      return { lat: latitude, lon: longitude };
    }

    // 2️⃣ Otherwise, check local_results
    const localResults = resp.data.local_results || [];
    if (localResults.length > 0 && localResults[0].gps_coordinates) {
      const { latitude, longitude } = localResults[0].gps_coordinates;
      return { lat: latitude, lon: longitude };
    }

    console.warn("No gps_coordinates found for:", pincode);
    return null;
  } catch (err: any) {
    console.error("SerpApi error:", err.response?.data || err.message);
    return null;
  }
}
