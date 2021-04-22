import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList, Button, ScrollView} from 'react-native';

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      scrollToHeight: 0,
      demoList:[
        {
          id: 3,
          name: "Omkar"
        },
        {
          id: 2,
          name: "Abhishek"
        },
        {
          id: 1,
          name: "Saurabh"
        },
        {
          id: 1,
          name: "Saurabh"
        },
        {
          id: 4,
          name: "Chintan"
        },   
        {
          id: 6,
          name: "Hardik"
        },
        {
          id: 5,
          name: "Lalit"
        },
        {
          id: 2,
          name: "Abhishek"
        },
        {
          id: 1,
          name: "Saurabh"
        },
        {
          id: 1,
          name: "Saurabh"
        },
        {
          id: 4,
          name: "Chintan"
        },   
        {
          id: 6,
          name: "Hardik"
        },
        {
          id: 5,
          name: "Lalit"
        },
      ]
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
       return {
         title:  'DetailsView',
         headerStyle: {
             backgroundColor: '#0570E9',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
             fontWeight: 'bold',
         }, 
       }
    };

  componentDidMount() {
   // do API call here
  }

  // Method to meausre Y offset 
  measure(){
    this.refs.Marker.measure((width, height, px, py, fx, fy) => {
      console.log("++++++ fy "+fy+" "+height);
      
      this.setState({ scrollToHeight: fy });
      this.scrollToView(fy - 70);
    });
  };
  // Method to scroll to particular reference view components
  scrollToView(fy) {
    this.setState({ scrollToHeight: fy });
    var scrollSize = parseInt(this.state.scrollToHeight);
    console.log("+++++ scrollSize "+scrollSize);
    
    this._scrollView
      .getScrollResponder()
      .scrollTo({ x: 0, y: scrollSize, animated: true });
  }

  render() {
    return (
      <View style={styles.container}>
         <View >
          <Button
            title="Sort List"
            onPress={() => this.measure()}  //<--- call method
          />
          </View>
      <ScrollView ref={view => (this._scrollView = view)}>
      <View >
        <View  style={{margin:10, alignItems:'center', justifyContent:'center'}}>
        <FlatList
         data={ this.state.demoList }
         extraData={this.state}
         ItemSeparatorComponent = {this.ItemSeparatorLine}
         renderItem={({item}) => 
             <View>
               <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:20, margin: 15}}>{item.id}</Text>
                <Text style={{fontSize:20, margin: 15}}>{item.name}</Text>
              </View>
            </View>
        }
         keyExtractor={(item, index) => index} />
       <View ref="Marker">   //<--- Reference view component
          <Button
            title="Measure me" />
      </View>
    </View>
   </View>
  </ScrollView>
  </View>
    );
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10, 
  },
  instructions: {
    marginBottom: 5, 
    fontSize: 18,
    textAlign: 'center',
    color: '#333333',
  },
});