import {Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, Region} from 'react-native-maps';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {getDistance as geolibGetDistance} from 'geolib';
import {RefObject} from 'react';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type ETAResult = {
  distanceInKm: number;
  durationInMinutes: number;
};

export type LocationMarker = {
  id: string;
  coordinate: Coordinates;
  title?: string;
  description?: string;
};

class LocationManager {
  static async checkLocationPermission(): Promise<boolean> {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    });

    if (!permission) return false;

    let result = await check(permission);
    if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
      result = await request(permission);
    }

    return result === RESULTS.GRANTED;
  }

  static async getCurrentLocation(): Promise<Coordinates | null> {
    const hasPermission = await this.checkLocationPermission();
    if (!hasPermission) {
      console.log('Location permission not granted');
      return null;
    }

    return new Promise(resolve => {
      Geolocation.getCurrentPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          console.log('Location error:', error.message);
          resolve(null);
        },
        {
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    });
  }

  // static async getFormattedAddress(coords: Coordinates): Promise<string | null> {
  //   try {
  //     const GOOGLE_API_KEY = 'AIzaSyBfw3A9f8MClzx5wDMjnVKmaXb5OlvTE-M';
  //     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${GOOGLE_API_KEY}`;

  //     const response = await axios.get(url);
  //     const data = response.data;

  //     if (data.status === 'OK') {
  //       return data.results[0]?.formatted_address || null;
  //     } else {
  //       console.warn('Google Geocoding error:', data.status, data.error_message);
  //       return null;
  //     }
  //   } catch (error) {
  //     console.log('Reverse geocoding error:', error);
  //     return null;
  //   }
  // }

  static async getFormattedAddress(
    coords: Coordinates,
  ): Promise<string | null> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`,
      );
      const data = await response.json();
      return data?.display_name || null;
    } catch (error) {
      console.log('Reverse geocoding error:', error);
      return null;
    }
  }

  static getDistanceInMeters(start: Coordinates, end: Coordinates): number {
    return geolibGetDistance(start, end);
  }

  static getDistanceInKm(start: Coordinates, end: Coordinates): number {
    const meters = this.getDistanceInMeters(start, end);
    return +(meters / 1000).toFixed(2);
  }

  static estimateETA(
    origin: Coordinates,
    destination: Coordinates,
    avgSpeedKmph = 40,
  ): ETAResult {
    const distanceInKm = this.getDistanceInKm(origin, destination);
    const durationInMinutes = Math.round((distanceInKm / avgSpeedKmph) * 60);
    return {distanceInKm, durationInMinutes};
  }

  static zoomIn(
    region: Region,
    setRegion: (r: Region) => void,
    mapRef: RefObject<MapView | null>,
  ) {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 300);
  }

  static zoomOut(
    region: Region,
    setRegion: (r: Region) => void,
    mapRef: RefObject<MapView | null>,
  ) {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 300);
  }

  static renderCurrentMarker(
    currentLocation: Coordinates | null,
  ): React.ReactNode {
    if (!currentLocation) return null;
    return (
      <Marker
        coordinate={currentLocation}
        title="You are here"
        pinColor="blue"
      />
    );
  }

  static renderMultipleMarkers(
    markerList: LocationMarker[],
  ): React.ReactNode[] {
    return markerList.map(marker => (
      <Marker
        key={marker.id}
        coordinate={marker.coordinate}
        title={marker.title}
        description={marker.description}
        pinColor="red"
      />
    ));
  }
}

export default LocationManager;
