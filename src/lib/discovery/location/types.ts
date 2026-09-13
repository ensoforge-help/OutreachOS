export interface Geocoder {
  geocode(location: string): Promise<{ latitude: number, longitude: number }>
}
