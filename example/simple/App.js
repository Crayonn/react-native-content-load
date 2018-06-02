import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, Animated, Platform } from 'react-native';
import LoadWarpper from 'react-native-content-load';
export default class ContentLoad extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <LoadWarpper
          classNames={styles.inner} >
          <View style={styles.innerContainer}>
            <View style={styles.imageContainer}>
              <View style={styles.imageBackground}>
              </View>
            </View>
            <View style={styles.listContainer}>
              <View style={styles.listFirst}></View>
              <View style={styles.listSecond}></View>
              <View style={styles.listTree}></View>
            </View>
          </View>
        </LoadWarpper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  inner: {
    height: 120,
    paddingLeft: 20,
    paddingTop: 20,
  },
  innerContainer: {
    borderBottomWidth: 1,
    flexGrow: 1,
    flexDirection: 'row',
    borderColor: '#F1F1F1',
  },
  imageContainer: {
    height: 100,
    paddingRight: 16,
    paddingBottom: 20,
  },
  imageBackground: {
    backgroundColor: '#F1F2F3',
    width: 80,
    height: 80,
  },
  listContainer: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  listFirst: {
    width: 132,
    height: 15,
    marginTop: 1,
    backgroundColor: '#F6F6F7',
  },
  listSecond: {
    width: 215,
    height: 13,
    marginTop: 11,
    backgroundColor: '#F6F6F7',
  },
  listTree: {
    width: 79,
    height: 14,
    marginTop: 23,
    backgroundColor: '#F6F6F7',
  }
})
