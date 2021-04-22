import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../constants/Colors';

const MapScreen = props => {
  const initialLocation = props.navigation.getParam('initialLocation');
  const readonly = props.navigation.getParam('readonly');

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  let mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0,
    longitudeDelta: 0.0
  };

/*  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421*/


  const selectLocationHandler = event => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      // could show an alert!
      return;
    }
    props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  // ISEO-TBD: who's using saveLocation?
  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  /*
  let markerCoordinates1= {
    latitude: 37.347894,
    longitude: -121.861238
  }*/

  let markerCoordinates1; 

  if(selectedLocation) {
    markerCoordinates1= {
      latitude: 37.54,
      longitude: -121.99
    }

    /*  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
  * ISEO-TBD: what's the proper value for latitudeDelta and longitudeDelta
  * https://stackoverflow.com/questions/50882700/react-native-mapview-what-is-latitudedelta-longitudedelta
  */

    console.warn(`difference = ${Math.abs(markerCoordinates.latitude-markerCoordinates1.latitude)}`);

    mapRegion = {
      latitude: (markerCoordinates.latitude+markerCoordinates1.latitude)/2,
      longitude: (markerCoordinates.longitude+markerCoordinates1.longitude)/2 ,
      latitudeDelta: Math.abs(markerCoordinates.latitude-markerCoordinates1.latitude)*1.2,
      longitudeDelta: Math.abs(markerCoordinates.longitude-markerCoordinates1.longitude)*1.2
    };
  }


  if(selectedLocation) {
    console.warn(`markerCoordinates=${JSON.stringify(markerCoordinates)}`);
    console.warn(`markerCoordinates1=${JSON.stringify(markerCoordinates1)}`);
    console.warn(`markerCoordinates1=${JSON.stringify(markerCoordinates1)}`);
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >

    {markerCoordinates && (
        <Marker key={0} title="Home Location" coordinate={markerCoordinates} />
      )}

    {markerCoordinates1 && (
    <Marker key={1} title="Another Location" coordinate={markerCoordinates1} />
    )}


    </MapView>
  );
};

MapScreen.navigationOptions = navData => {
  const saveFn = navData.navigation.getParam('saveLocation');
  const readonly = navData.navigation.getParam('readonly');
  if (readonly) {
    return {};
  }
  return {
    headerRight: (
      <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

export default MapScreen;
