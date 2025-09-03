import axios from "axios";

export async function getLatLongFromPincode(
  pincode: string
): Promise<{ lat: number; lon: number }> {
  const SERPAPI_KEY = process.env.SERPAPI_KEY;

  // Helper to generate random coordinates (within India approx bounds)
  const getRandomLatLon = () => {
    const lat = 8 + Math.random() * (37 - 8); // 8°N to 37°N
    const lon = 68 + Math.random() * (97 - 68); // 68°E to 97°E
    return { lat, lon };
  };

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

    const gps =
      resp.data.place_results?.gps_coordinates ||
      resp.data.local_results?.[0]?.gps_coordinates;

    if (gps) {
      return { lat: gps.latitude, lon: gps.longitude };
    }

    console.warn(
      "No gps_coordinates found for:",
      pincode,
      "- returning random"
    );
    return getRandomLatLon();
  } catch (err: any) {
    console.error("SerpApi error:", err.response?.data || err.message);
    return getRandomLatLon();
  }
}
