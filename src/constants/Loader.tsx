import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {colors} from './Colors';

interface LoaderState {
  loading: boolean;
}

export default class Loader extends Component<{}, LoaderState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    return this.state.loading ? (
      <View style={styles.vwMain}>
        <View style={styles.vwWhite}>
          <ActivityIndicator size={'large'} color={colors.orange1c} />
        </View>
      </View>
    ) : null;
  }

  toggleLoader(shouldShow: boolean) {
    this.setState({loading: shouldShow});
  }
}

const styles = StyleSheet.create({
  // View Style
  vwMain: {
    backgroundColor: colors.black50,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwWhite: {
    backgroundColor: colors.white,
    borderRadius: 10,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
