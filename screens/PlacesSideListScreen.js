import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Container, Platform, FlatList, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import MapComponent from '../components/MapComponent';
import * as placesActions from '../store/places-actions';
/*
<FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
          onSelect={() => {
            props.navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id
            });
          }}
        />
      )}
    />*/
const PlacesSideListScreen = props => {
  const places = useSelector(state => state.places.places);
  const dispatch = useDispatch();

  function getListOfPlaces() {
      let listOfPlaces = [];

      for(let index=0; index<places.length; index++) {
          let itemData = places[index];
          console.warn(`itemData=${JSON.stringify(itemData)}`);
          listOfPlaces.push(
            <PlaceItem
                image={itemData.imageUri}
                title={itemData.title}
                address={itemData.address}
                onSelect={() => {
                props.navigation.navigate('PlaceDetail', {
                    placeTitle: itemData.title,
                    placeId: itemData.id
                });
                }}
            />
          )
      }
      return listOfPlaces;
  }

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);


  //console.warn(`getListOfPlaces()=${getListOfPlaces().length}`);
  return (
  <MapComponent readonly='true' initialLocation={{lat: 37.78, lng: -122.43}} scrollView={getListOfPlaces()}/>
  );

  /*
  return (
        <View> 
            <MapComponent readonly='true' initialLocation={{lat: 37.78, lng: -122.43}} />
            <ScrollView
                horizontal={true}
                pagingEnabled
            >
                {getListOfPlaces()}
            </ScrollView>    
        </View>
  );*/
};

PlacesSideListScreen.navigationOptions = navData => {
    return {
      headerTitle: 'All Places',
      headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add Place"
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={() => {
              navData.navigation.navigate('NewPlace');
            }}
          />
        </HeaderButtons>
      )
    };
  };
const styles = StyleSheet.create({});

export default PlacesSideListScreen;
