import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Button} from 'react-native';
import {Transitioning, Transition} from 'react-native-reanimated'

const {width} = Dimensions.get("window")

const pictures = [
  {id: 1, source: require('./assets/tiziano.jpeg')},
  {id: 2, source: require('./assets/scanda.jpg')},
  {id: 3, source: require('./assets/matteo.png')}
]
const column = {
  id: "column",
  name: "Column",
  layout: {
    container: {
      alignItems: "center"
    }
  }
}

const row = {
  id: "row",
  name: "Row",
  layout: {
    container: {
      flexDirection: "row",
      alignItems: "center"
    }
  }
}

const wrap = {
  id: "wrap",
  name: "Wrap",
  layout: {
    container: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap"
    },
    child: {
      flex: 0,
      width: width / 2 - 8 * 2
    }
  }
}

const layouts = [column, row, wrap]
const transition = <Transition.Change durationMs={400} interpolation="easeInOut"/>

export default function App() {
  const [currentLayout, setCurrentLayout] = useState(layouts[0])
  const ref = useRef(null)
  return (
    <>
      <Transitioning.View style={[styles.container, currentLayout.container]} {...{transition, ref}}>
        {pictures.map((picture) => 
          <Image key={picture.id} source={picture.source} style={[styles.picture, currentLayout.child]}/>
          )
        }
        
      </Transitioning.View>
      {
        layouts.map(layout => 
          <Button key={layout.id} title={layout.name} onPress={() => {
          if(ref.current){
            ref.current.animateNextTransition()
          };
          setCurrentLayout(layout.layout)}
          }/>
          )
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  picture:{
    flex: 1,
    maxWidth: "100%",
    aspectRatio: 1324 / 863,
    margin: 7,
    borderRadius: 5,
    resizeMode: "contain"
  }
});
