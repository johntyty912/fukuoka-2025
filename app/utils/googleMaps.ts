export const getGoogleMapsUrl = (address: string, name?: string) => {
  // If name is provided, use it as the search query as it often yields better results for business POIs
  // Otherwise fall back to the address
  const query = name || address;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};
