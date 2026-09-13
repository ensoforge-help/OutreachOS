import type { Business } from "@/types/business"

export function mapOSMPlace(place: any, fallbackCategory: string = "business"): Business {
  const tags = place.tags ?? {}
  
  let category = tags.amenity ?? tags.shop ?? tags.tourism ?? tags.leisure ?? tags.office ?? tags.craft ?? fallbackCategory;
  if (category === "yes") {
    category = fallbackCategory;
  }
  
  return {
    provider: "openstreetmap",
    providerId: `${place.type}/${place.id}`,
    name: tags.name ?? "Unnamed Business",
    category: category,
    address: tags["addr:street"]  
        ? `${tags["addr:housenumber"] ? tags["addr:housenumber"] + " " : ""}${tags["addr:street"]}` 
        : undefined,
    city: tags["addr:city"],
    latitude: place.lat ?? place.center?.lat,
    longitude: place.lon ?? place.center?.lon,
    phone: tags.phone ?? tags["contact:phone"],
    website: tags.website ?? tags["contact:website"],
    hasWebsite: !!(tags.website ?? tags["contact:website"]),
    openingHours: tags.opening_hours ? [tags.opening_hours] : undefined,
    metadata: tags,
  }
}
