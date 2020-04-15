import React, { useState } from "react";
import { View, Dimensions, ScrollView, processColor } from 'react-native';
import { Button, Card, Title, Paragraph, Avatar, IconButton } from 'react-native-paper';
import { LineChart } from "react-native-chart-kit";
import FlashMessage, { showMessage } from "react-native-flash-message";
import LineCharte from "./LineCharte";
import Header from '../Common/Header'
import Loader from "../Common/Loader";
import { useSelector } from "react-redux";

export default function Home(props) {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const [marker, setMarker] = useState({ enabled: true, digits: 1, markerColor: processColor("#00b5af"), textColor: processColor('white'), markerFontSize: 14, })
  const isLoading = useSelector((state) => state.HomeReducer.isLoading)

  const dataChartX = () => {
    const dataValueX = ["January", "February", "March", "April", "May", "June", "February", "March", "April", "May", "June", "January", "February", "March", "April", "May", "June", "February", "March", "April", "May", "June"]
    return {
      valueFormatter: dataValueX,
      position: 'BOTTOM',
      granularityEnabled: true,
      granularity: 1,
      labelCount: 10,
      drawGridLines: false,
      // fontFamily: "HelveticaNeue-Medium",
    }

  }

  const dataChartY = () => {
    const dataValueY = [
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100
    ]
    return {
      values: dataValueY,
      label: 'temperature',
      config: {
        mode: "HORIZONTAL_BEZIER",
        drawValues: false,
        lineWidth: 2,
        drawCircles: true,
        circleColor: processColor("#f39911"),
        drawCircleHole: false,
        circleRadius: 2,
        highlightColor: processColor("#696969"),
        color: processColor("#f39911"),
        valueTextSize: 12,
        drawFilled: true,
        fillGradient: {
          colors: [processColor('rgba(255, 255, 255, 0.2)'), processColor("#f1d7b0")],
          positions: [0, 0.5],
          angle: 90,
          orientation: "TOP_BOTTOM"
        },
        fillAlpha: 1000,
      }
    }
  }

  return (
    <View>
      {isLoading ?
        <Loader />
        : <ScrollView>
          <Header navigation={props.navigation} />
          <View style={{ alignItems: "center", marginTop: 30, flexDirection: "row", justifyContent: "center" }}>
            <Card style={{ backgroundColor: "#00C853", width: "30%", marginRight: 10 }}>
              <Card.Content style={{ alignItems: "center" }}>
                <Avatar.Icon color="#00C853" icon="account-check" style={{ backgroundColor: "#fff" }} />
                <Title style={{ color: "#fff", fontSize: 16 }}>RÉTABLI</Title>
                <Paragraph style={{ color: "#fff" }}>14</Paragraph>
              </Card.Content>
            </Card>
            <Card style={{ backgroundColor: "#EBB121", width: "30%", marginRight: 10 }}>
              <Card.Content style={{ alignItems: "center" }}>
                <Avatar.Icon color="#EBB121" icon="account-alert" style={{ backgroundColor: "#fff" }} />
                <Title style={{ color: "#fff", fontSize: 16 }}>CONFIRMÉ</Title>
                <Paragraph style={{ color: "#fff" }}>14</Paragraph>
              </Card.Content>
            </Card>
            <Card style={{ backgroundColor: "#FF5252", width: "30%" }}>
              <Card.Content style={{ alignItems: "center" }}>
                <Avatar.Icon color="#FF5252" icon="account-remove" style={{ backgroundColor: "#fff" }} />
                <Title style={{ color: "#fff", fontSize: 16 }}>MORTS</Title>
                <Paragraph style={{ color: "#fff" }}>14</Paragraph>
              </Card.Content>
            </Card>
          </View>
          <Card >
            <Card.Content style={{ alignItems: "center" }}>
              <ScrollView horizontal={true}>
                <LineChart
                  onDataPointClick={({ value, getColor }) =>
                    showMessage({
                      message: `${value}`,
                      description: "You selected this value",
                      backgroundColor: getColor(0.5),
                      textStyle: { color: "#000" },
                    })
                  }
                  data={{
                    labels: ["January", "February", "March", "April", "May", "June", "February", "March", "April", "May", "June", "January", "February", "March", "April", "May", "June", "February", "March", "April", "May", "June"],
                    datasets: [
                      {
                        data: [
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100
                        ]
                      }
                    ]
                  }}
                  width={screenWidth + 700} // from react-native
                  height={220}
                  yAxisLabel="$"
                  yAxisSuffix="k"
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                    backgroundColor: "#6200ee",
                    backgroundGradientFrom: "#6200ee",
                    backgroundGradientTo: "#6200ee",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "2",
                      stroke: "#6200ee"
                    }
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16
                  }}
                />
                <FlashMessage duration={1000} />
              </ScrollView>
            </Card.Content>
          </Card>
          <ScrollView horizontal={true}>
            <View style={{ flex: 1, width: screenWidth * 2 }}>
              <LineCharte
                data={
                  [{ x: 1, y: Math.random() * 100 },
                  { x: 2, y: Math.random() * 100 },
                  { x: 3, y: Math.random() * 100 },
                  { x: 4, y: Math.random() * 100 },
                  { x: 5, y: Math.random() * 100 },
                  { x: 6, y: Math.random() * 100 },
                  { x: 7, y: Math.random() * 100 },
                  { x: 8, y: Math.random() * 100 },
                  { x: 9, y: Math.random() * 100 },
                  { x: 10, y: Math.random() * 100 },
                  { x: 11, y: Math.random() * 100 },
                  { x: 12, y: Math.random() * 100 },
                  { x: 13, y: Math.random() * 100 },
                  { x: 14, y: Math.random() * 100 },
                  { x: 15, y: Math.random() * 100 },
                  { x: 16, y: Math.random() * 100 },
                  { x: 17, y: Math.random() * 100 },
                  { x: 18, y: Math.random() * 100 },
                  { x: 19, y: Math.random() * 100 },
                  { x: 20, y: Math.random() * 100 },
                  { x: 21, y: Math.random() * 100 }
                  ]

                }
                FormaX='HH'
                titel={`Temperature(C°)`}
                label="temperature"
                color="#f1d7b0"
                lineColor="#f39911"
              />
            </View>
          </ScrollView>
        </ScrollView>}
    </View>
  );
}

