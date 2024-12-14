import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useGetBillboardsInMarketPlaceQuery } from '../../data/api/billboardSlice'
import { Ionicons } from '@expo/vector-icons'
import ProductComponent from './components/ProductComponent'

const DiscoverDetails = ({ route, navigation }) => {
  const token = useSelector(state => state.user.token)
  // console.log(token)
  const {
    data: marketPlaceData,
    isError,
    error,
    isLoading,
    isFetching
  } = useGetBillboardsInMarketPlaceQuery({ token: token })

  const { billboardSize } = route.params
  const explore = marketPlaceData?.data?.explore

  //console.log(explore)

  const filteredBillboards = explore?.filter(item => item.size == billboardSize)

  console.log(filteredBillboards)

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
        <Text>Fetching {billboardSize} Billboards</Text>
      </View>
    )
  }

  const ErrorComponent = () => {
    return (
      <View
        style={{
          marginTop: 100,
          paddingHorizontal: 15,
          paddingVertical: 30
        }}
      >
        <Image
          resizeMode='cover'
          source={require('../../assets/oops.png')}
          style={styles.billboardImage}
        />
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center'
          }}
        >
          Oops! Error finding billboards!
        </Text>
      </View>
    )
  }

  const NoBillboardsFound = () => {
    return (
      <View
        style={{
          marginTop: 100,
          paddingHorizontal: 15,
          paddingVertical: 30
        }}
      >
        <Image
          resizeMode='contain'
          source={require('../../assets/oops.png')}
          style={styles.billboardImage}
        />
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center'
          }}
        >
          Oops! No billboards yet
        </Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView
        style={{ marginBottom: 5 }}
        horizontal={false}
        showsVerticalScrollIndicator={false}
      > */}
      <View>
        <View
          style={{
            flexDirection: 'row',
            gap: 16,
            marginTop: 10
          }}
        >
          <Ionicons
            onPress={() => {
              navigation.goBack()
            }}
            name='arrow-back-outline'
            size={35}
            color='black'
          />
          <Text
            style={{
              fontWeight: '500',
              fontSize: 22,
              lineHeight: 26.63,
              alignSelf: 'center'
            }}
          >
            {billboardSize}{' '}
            {billboardSize != 'Spectacular Billboard' && 'Billboards'}
          </Text>
        </View>

        {isError ? (
          <ErrorComponent />
        ) : filteredBillboards?.length === 0 || !filteredBillboards ? (
          <NoBillboardsFound />
        ) : (
          <FlatList
            data={filteredBillboards}
            keyExtractor={item => item.size}
            renderItem={({ item }) => (
              <View style={{}}>
                <ProductComponent product={item} navigation={navigation} />
              </View>
            )}
            style={styles.billboardContainer}
            nestedScrollEnabled
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
          // <View style={styles.billboardContainer}>
          //   {filteredBillboards?.map((billboard, index) => (
          //     <View style={{}}>
          //       <ProductComponent
          //         product={billboard}
          //         key={index}
          //         navigation={navigation}
          //       />
          //     </View>
          //   ))}
          // </View>
        )}
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  )
}

export default DiscoverDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 16
  },
  billboardContainer: {
    // flexDirection: 'row',
    // borderWidth: 3,
    borderColor: 'red',
    padding: 0,
    marginTop: '10%'
  },
  billboardImage: {
    width: '100%',
    height: 274,
    borderRadius: 10
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16
  },
  listContent: {
    paddingBottom: 16
  }
})
