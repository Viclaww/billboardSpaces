import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import slide1 from './../../../../assets/slide1.png'
import slide2 from './../../../../assets/slide2.png'
import slide3 from './../../../../assets/slide3.png'
import RenderItems from './RenderItems'
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue
} from 'react-native-reanimated'
import Pagination from './Pagination'

const CustomCarousel = () => {
  const x = useSharedValue(0)
  const { width } = useWindowDimensions()

  const images = [slide1, slide2, slide3]

  const [data, setData] = useState(images)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [paginationIndex, setPaginationIndex] = useState(0)
  const ref = useAnimatedRef()
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const interval = useRef()
  const offset = useSharedValue(0)

  const onScroll = useAnimatedScrollHandler({
    onScroll: e => {
      x.value = e.contentOffset.x
    },
    onMomentumEnd: e => {
      offset.value = e.contentOffset.x
    }
  })

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (
      viewableItems[0].index !== undefined &&
      viewableItems[0].index !== null
    ) {
      setCurrentIndex(viewableItems[0].index)
      setPaginationIndex(viewableItems[0].index % images.length)
    }
  }

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  }

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged }
  ])

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true)
  })

  useEffect(() => {
    if (isAutoPlay) {
      interval.current = setInterval(() => {
        offset.value += width
      }, 4000)
    } else {
      clearInterval(interval.current)
    }
    return () => {
      clearInterval(interval.current)
    }
  }, [isAutoPlay, offset, width])

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        ref={ref}
        style={{ height: 'auto', flexGrow: 0 }}
        onScrollBeginDrag={() => {
          setIsAutoPlay(false)
        }}
        onScrollEndDrag={() => {
          setIsAutoPlay(true)
        }}
        bounces={false}
        onScroll={onScroll}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `list_item${index}`}
        scrollEventThrottle={16}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onEndReached={() => setData([...data, ...images])}
        onEndReachedThreshold={0.5}
        horizontal
        renderItem={({ item, index }) => {
          return <RenderItems item={item} index={index} x={x} />
        }}
      />
      <Pagination paginationIndex={paginationIndex} images={images} />
    </View>
  )
}

export default CustomCarousel

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
