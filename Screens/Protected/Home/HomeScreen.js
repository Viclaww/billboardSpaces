import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
  StatusBar,
  SafeAreaView,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
import ProductComponent from '../components/ProductComponent'
import PopularComponent from '../components/PopularComponent'
import EventComponent from '../components/EventComponent'
import slide1 from '../../../assets/slide1.png'
import slide2 from '../../../assets/slide2.png'
import slide3 from '../../../assets/slide3.png'
import { useSelector } from 'react-redux'
import { useGetHomeQuery } from '../../../data/api/billboardSlice'
import { avatarImage } from '../../../data/util'
import { NotificationIcon } from '../components/Icons'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default function HomeScreen ({ navigation }) {
  const splitIntoRows = data => {
    const rows = []
    for (let i = 0; i < data.length; i += 2) {
      rows.push(data.slice(i, i + 2))
    }
    return rows
  }

  const user = useSelector(state => state.user.user)
  const token = useSelector(state => state.user.token)

  const [popular, setPopular] = useState([])
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [events, setEvents] = useState([])

  const { data, error: homeError, isFetching } = useGetHomeQuery({ token })

  const scrollViewRef = React.createRef()
  useEffect(() => {
    if (data) {
      // console.log(data);

      setPopular(data.data.popular)
      setProducts(data.data.new)
    }
    if (homeError) {
      console.log('failed', homeError)
      if (home.data.status === 401) {
        navigation.navigate('SignIn')
      }
    }
  }, [data])

  const images = [slide1, slide2, slide3]

  const [imgActive, setimgActive] = useState(0)

  onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      )
      // console.log(slide)
      if (slide != imgActive) {
        setimgActive(slide)
      }
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setimgActive(prev => (prev == images.length - 1 ? 0 : prev + 1))
    }, 3000)
    return () => {
      clearInterval(timer)
    }
  }, [images])

  useEffect(() => {
    scrollViewRef?.current?.scrollTo({
      x: imgActive * WIDTH * 0.9,
      animated: true
    }) //if screenwidth is 300 and it's on the first image, x:0*300*0.9, making it 0
    //if it's index is 1, x:1*300*0.9 =298, so it will move the image 298px to the right
  }, [imgActive])

  if (isFetching) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator size='large' color='#0080FE' />
        <Text>Fetching Billboards</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ marginBottom: 5, backgroundColor: 'white' }}
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.rectangle1}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 100 }}
              source={{ uri: user?.image || avatarImage }}
            />
            <Text style={{ fontSize: 21 }}>
              Welcome {user ? user['display-name'] : 'User'}
            </Text>
          </View>
          <View style={{}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Notification')
              }}
            >
              <NotificationIcon />
            </TouchableOpacity>
          </View>
        </View>

        <View
        // style={{flex:1}}
        >
          <ScrollView
            onScroll={({ nativeEvent }) => onchange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={styles.wrap}
            contentContainerStyle={styles.wrapScroll}
            ref={scrollViewRef}
            scrollEventThrottle={16}
          >
            {images.map((image, index) => (
              <Image
                key={index}
                resizeMode='contain'
                style={styles.wrap2}
                source={image}
                contentFit='contain'
              />
            ))}
          </ScrollView>
          <View style={styles.wrapDot}>
            {images.map((e, index) => (
              <Text
                key={e}
                style={imgActive == index ? styles.dotActive : styles.dot}
              >
                {/* <View style={{, }}/> */}
              </Text>
            ))}
          </View>
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={styles.newlyAdded}>Newly Added</Text>
          <View style={styles.newlyAddedScroll}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.img2}>
                {products &&
                  products.map((product, index) => (
                    <ProductComponent
                      navigation={navigation}
                      key={index}
                      product={product}
                    ></ProductComponent>
                  ))}
              </View>
            </ScrollView>
          </View>
          <Text style={styles.newlyAdded}>Discover</Text>

          <Image
            resizeMode='contain'
            source={require('../../../assets/Discover.png')}
            style={{
              marginLeft: 25,
              width: '90%',
              marginTop: 10
            }}
          />
          {/* noevents api found
        <Text style={styles.newlyAdded}>Upcoming Events</Text>

        <View style={styles.newlyAddedScroll}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.img2}>
              <EventComponent
                events={{
                  image: slide2,
                }}
              />
            </View>
          </ScrollView>
        </View> */}
          <Text style={styles.newlyAdded}>Popular</Text>
          <View style={styles.popularContainer}>
            {splitIntoRows(popular).map((row, rowIndex) => (
              <View key={rowIndex} style={styles.popularRow}>
                {row.map((item, itemIndex) => (
                  <PopularComponent
                    navigation={navigation}
                    key={itemIndex}
                    popular={item}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'white'
  },
  rectangle1: {
    width: 'auto',
    height: 40,
    marginTop: '5%',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between'
    // marginBottom:
  },
  ads: {
    width: 343
  },
  wrap: {
    marginTop: 20,
    borderRadius: 10,
    width: WIDTH * 0.9,
    flex: 1,
    margin: 'auto'
    // marginHorizontal:10
  },
  wrapScroll: {},

  wrap2: {
    justifyContent: 'center',
    width: WIDTH,
    maxWidth: '100%'
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  dotActive: {
    margin: 2,
    backgroundColor: '#66B3FF',
    borderRadius: 10,
    width: 26,
    height: 4,
    alignSelf: 'center',
    marginBottom: 10
  },
  dot: {
    marginBottom: 10,
    borderRadius: 5,
    margin: 2,
    color: 'white',
    backgroundColor: 'white',
    width: 8,
    height: 8
  },
  newlyAdded: {
    fontSize: 22,
    fontWeight: '500',
    color: '#1e1e1e',
    marginTop: 20,
    marginBottom: 10
  },
  newlyAddedScroll: {
    alignItems: 'center',
    justifyContent: 'start'
  },
  rectangleIcon2: {
    borderRadius: 10,
    height: 150,
    width: 159.5
  },
  rectangleIcon3: {
    borderRadius: 10,
    height: 150,
    width: 159.5
  },
  img: {
    padding: 5
  },
  img2: {
    // padding: 5,
    flexDirection: 'row'
    // backgroundColor: 'red',
    //paddingLeft: 25,

    // flex: 1,
  },
  popularContainer: {
    // padding: 5,
    // flexDirection: 'row',
    // backgroundColor: 'red',
    //paddingLeft: 25,
    // flex: 1,
  },
  popularRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  discover: {
    width: 344,
    height: '100%',
    // marginLeft: 25,
    backgroundColor: 'blue'
  }
})
