/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, PureComponent } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { connectStyle } from "native-base";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Text,
  Body,
  Subtitle,
  Spinner
} from "native-base";
import { connect } from "react-redux";
import { fetchData, getTemp } from "./store/actions/getTempA";
import AsyncStorage from "@react-native-community/async-storage";
// navigator.geolocation = require("@react-native-community/geolocation");

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};

class App extends PureComponent<Props> {
  componentWillMount() {
    const config = {
      skipPermissionRequests: false,
      authorizationLevel: "always"
    };

    navigator.geolocation.setRNConfiguration(config);

    this.props.onGetWeather();
  }

  render() {
    return (
      <Container>
        <Header style={styles.hd}>
          <Left />
          <Body>
            <Title style={styles.titl}>Forecast</Title>
            <Subtitle style={styles.subt}>Weather at your location</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Text>
                Last update: {new Date(this.props.data.time).toLocaleString()}
              </Text>
            </CardItem>
            <CardItem>
              <Text style={styles.bl}>
                Temperature:
                {JSON.stringify(this.props.data.temp.temp) + " Celsius"}
              </Text>
            </CardItem>
            <CardItem>
              <Text style={styles.bl}>
                Pressure:
                {JSON.stringify(this.props.data.temp.pressure) + " hPa"}
              </Text>
            </CardItem>
            <CardItem>
              <Text style={styles.bl}>
                Humidity: {JSON.stringify(this.props.data.temp.humidity) + " %"}
              </Text>
            </CardItem>
            <CardItem>
              <Left />
              <Body />
              <Right>
                <Button onPress={() => this.props.onGetWeather()}>
                  {this.props.loading == false ? (
                    <Icon active name="refresh" />
                  ) : (
                    <Spinner color="grey" />
                  )}
                  <Text style={styles.bt}>
                    {/* {JSON.stringify(this.props.loading)} Refresh */}
                    Update
                  </Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = {
  subt: { paddingBottom: Platform.OS === "ios" ? 5 : 1, textAlign: "auto" },
  titl: { paddingTop: Platform.OS === "ios" ? 4 : 0, textAlign: "auto" },
  hd: { height: Platform.OS === "ios" ? 80 : 70 },
  bt: { paddingLeft: 4 },
  bl: { fontWeight: "bold" }
};

connectStyle("styles", styles)(App);

const mapStateToProps = state => {
  return {
    data: state.getTemp,
    loading: state.getTemp.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetWeather: () => dispatch(fetchData()),
    onSetWeather: weath => dispatch(getTemp(weath))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
