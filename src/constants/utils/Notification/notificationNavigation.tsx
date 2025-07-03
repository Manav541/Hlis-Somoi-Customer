import * as React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

// Create a reference for navigation
export const navigationRef = React.createRef<NavigationContainerRef<any>>();

// Navigate to a specific screen using the ref
export function navigate(name: string, params?: Record<string, any>) {
  if (navigationRef.current) {
    setTimeout(() => {
      navigationRef.current?.navigate(name, params);
    }, 500);
  } else {
    console.log('Navigation is not ready yet.');
  }
}
