import React from 'react'
import { StyleSheet, View } from 'react-native'

const Dot = ({ index, paginationIndex }) => {
  return (
    <View
      style={paginationIndex === index ? styles.dotActive : styles.dotInactive}
    />
  )
}

export default Dot

const styles = StyleSheet.create({
  dotInactive: {
    backgroundColor: 'white',
    height: 9,
    width: 9,
    marginHorizontal: 2,
    borderRadius: 8
  },
  dotActive: {
    backgroundColor: '#66B3FF',
    height: 4.5,
    width: 28,
    marginHorizontal: 2,
    borderRadius: 8
    // opacity: 0.5
  }
})
