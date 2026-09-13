export interface BBox {
  south: number
  west: number
  north: number
  east: number
}

// Simple approximation: 1 degree latitude is approx 111km.
// 1 degree longitude varies, but at equator it's 111km. 
// For simplicity in this example, we calculate a rough bbox.
export function calculateBBox(latitude: number, longitude: number, radiusKm: number): BBox {
    const latOffset = radiusKm / 111
    const lonOffset = radiusKm / (111 * Math.cos(latitude * (Math.PI / 180)))
    
    return {
        south: latitude - latOffset,
        north: latitude + latOffset,
        west: longitude - lonOffset,
        east: longitude + lonOffset
    }
}

export function buildCategoryQuery(categoryMap: { key: string, value: string }[], bbox: BBox) {
  const { south, west, north, east } = bbox
  
  // Build the node/way/relation queries for each category mapping
  const nwrQueries = categoryMap.map(c => 
    `nwr ["${c.key}"="${c.value}"] (${south},${west},${north},${east});`
  ).join("\n")

  return `
    [out:json][timeout:90];
    (
      ${nwrQueries}
    );
    out center tags;
  `
}
