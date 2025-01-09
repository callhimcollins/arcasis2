import { StyleSheet, Text, ScrollView, View } from 'react-native'
import React from 'react'



const IdeaBox = ({ idea }: { idea: string }) => {
    return (
      <View style={styles.container}>
          <Text style={styles.buttonText}>{idea}</Text>
      </View>
    );
  };
  

export default IdeaBox

const styles = StyleSheet.create({
    contentContainer: {

    },
    container: {
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 15,
        elevation: 3
    },
    buttonText: {
        fontFamily: 'soraextrabold',
        fontSize: 15
    }
})