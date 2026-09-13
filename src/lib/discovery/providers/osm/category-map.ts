export const OSM_CATEGORY_MAP: Record<string, { key: string, value: string }[]> = {
  'restaurant': [
    { key: "amenity", value: "restaurant" },
    { key: "amenity", value: "fast_food" },
    { key: "amenity", value: "cafe" }
  ],
  'clinic': [
    { key: "amenity", value: "clinic" },
    { key: "amenity", value: "doctors" },
    { key: "amenity", value: "dentist" }
  ],
  'gym & fitness': [
    { key: "leisure", value: "fitness_centre" },
    { key: "leisure", value: "sports_centre" }
  ],
  'salon & spa': [
    { key: "shop", value: "beauty" },
    { key: "shop", value: "hairdresser" },
    { key: "shop", value: "massage" },
    { key: "leisure", value: "spa" }
  ],
  'educational institute': [
    { key: "amenity", value: "school" },
    { key: "amenity", value: "college" },
    { key: "amenity", value: "university" },
    { key: "amenity", value: "language_school" }
  ],
  'real estate': [
    { key: "office", value: "estate_agent" }
  ],
  'retail store': [
    { key: "shop", value: "supermarket" },
    { key: "shop", value: "convenience" },
    { key: "shop", value: "clothes" },
    { key: "shop", value: "department_store" },
    { key: "shop", value: "yes" }
  ],
  'auto service': [
    { key: "shop", value: "car_repair" },
    { key: "amenity", value: "car_wash" },
    { key: "shop", value: "car_parts" }
  ],
  'hotel & hospitality': [
    { key: "tourism", value: "hotel" },
    { key: "tourism", value: "motel" },
    { key: "tourism", value: "guest_house" },
    { key: "tourism", value: "hostel" }
  ],
  'professional services': [
    { key: "office", value: "lawyer" },
    { key: "office", value: "accountant" },
    { key: "office", value: "consulting" },
    { key: "office", value: "company" }
  ]
}

export function getOSMTagsForCategory(category: string) {
  const normalizedCategory = category.toLowerCase().trim()
  if (OSM_CATEGORY_MAP[normalizedCategory]) {
    return OSM_CATEGORY_MAP[normalizedCategory]
  }
  
  // If not explicitly mapped, try searching for it dynamically
  // across common OSM keys, replacing spaces with underscores.
  const osmValue = normalizedCategory.replace(/\s+/g, '_')
  return [
    { key: "amenity", value: osmValue },
    { key: "shop", value: osmValue },
    { key: "office", value: osmValue }
  ]
}
