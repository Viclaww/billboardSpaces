import React from 'react'
import { StyleSheet, View } from 'react-native'
import Dot from './Dot'

const Pagination = ({ paginationIndex, images }) => {
  return (
    <View style={styles.container}>
      {images.map((_, index) => {
        return (
          <Dot index={index} key={index} paginationIndex={paginationIndex} />
        )
      })}
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: '4%',
    margin: 'auto',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
