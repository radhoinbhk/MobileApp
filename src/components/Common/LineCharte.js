import React, { useState, useEffect } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, processColor
} from 'react-native';


import { LineChart } from 'react-native-charts-wrapper';
import moment from 'moment';

export default LineCharte = (props) => {
    const [marker, setMarker] = useState({ enabled: true, digits: 1, markerColor: processColor(props.lineColor), textColor: processColor('white'), markerFontSize: 14, })

    const dataChartX = () => {
        return {
            valueFormatter: 'date',
            valueFormatterPattern: 'dd/MM',
            position: 'BOTTOM',
            granularityEnabled: true,
            granularity: 1,
            labelCount: 10,
            drawGridLines: false,
        }

    }

    const dataChartY = (label, color, lineColor) => {
        return {
            values: props.data,
            label: label,
            config: {
                mode: "HORIZONTAL_BEZIER",
                drawValues: false,
                lineWidth: 2,
                drawCircles: true,
                circleColor: processColor(lineColor),
                drawCircleHole: false,
                circleRadius: 2,
                highlightColor: processColor("#696969"),
                color: processColor(lineColor),
                valueTextSize: 12,
                drawFilled: true,
                fillGradient: {
                    colors: [processColor('rgba(255, 255, 255, 0.2)'), processColor(color)],
                    positions: [0, 0.5],
                    angle: 90,
                    orientation: "TOP_BOTTOM"
                },
                fillAlpha: 1000,
            }
        }
    }


    const dataRetabliesChartY = (label, color, lineColor) => {
        return {
            values: props.dataRetablies,
            label: label,
            config: {
                mode: "HORIZONTAL_BEZIER",
                drawValues: false,
                lineWidth: 2,
                drawCircles: true,
                circleColor: processColor(lineColor),
                drawCircleHole: false,
                circleRadius: 2,
                highlightColor: processColor("#696969"),
                color: processColor(lineColor),
                valueTextSize: 12,
                drawFilled: true,
                fillGradient: {
                    colors: [processColor('rgba(255, 255, 255, 0.1)'), processColor(color)],
                    positions: [0, 0.5],
                    angle: 90,
                    orientation: "TOP_BOTTOM"
                },
                fillAlpha: 1000,
            }
        }
    }

    const dataDecesChartY = (label, color, lineColor) => {
        return {
            values: props.dataDeces,
            label: label,
            config: {
                mode: "HORIZONTAL_BEZIER",
                drawValues: false,
                lineWidth: 2,
                drawCircles: true,
                circleColor: processColor(lineColor),
                drawCircleHole: false,
                circleRadius: 2,
                highlightColor: processColor("#696969"),
                color: processColor(lineColor),
                valueTextSize: 12,
                drawFilled: true,
                fillGradient: {
                    colors: [processColor('rgba(255, 255, 255, 0.1)'), processColor(color)],
                    positions: [0, 0.5],
                    angle: 90,
                    orientation: "TOP_BOTTOM"
                },
                fillAlpha: 1000,
            }
        }
    }

    useEffect(() => {
        dataChartX();
    }, [props.data])


    return (
        <View style={{ paddingVertical: 20 }}>

            <Text
                style={{
                    fontSize: 14, color: "black", marginLeft: 15, marginTop: 10,
                    fontWeight: "bold"
                }}
            >{props.titel}</Text>

            <LineChart style={styles.chart}
                chartDescription={{ text: '' }}
                legend={{ enabled: false }}
                marker={marker}
                yAxis={{ left: { drawGridLines: false, }, right: { enabled: false, drawGridLines: false, } }}
                xAxis={dataChartX()}
                drawGridBackground={true}
                borderWidth={1}
                drawBorders={false}
                autoScaleMinMaxEnabled={false}
                touchEnabled={true}
                dragEnabled={true}
                scaleEnabled={true}
                scaleXEnabled={true}
                scaleYEnabled={true}
                pinchZoom={true}
                avoidFirstLastClipping={true}
                animation={{
                    durationY: 1000,
                }}
                doubleTapToZoomEnabled={false}
                highlightPerTapEnabled={true}
                highlightPerDragEnabled={false}
                dragDecelerationEnabled={true}
                dragDecelerationFrictionCoef={0.99}
                keepPositionOnRotation={false}
                data={
                    {
                        dataSets: [
                            dataChartY(props.label, "#E36C8D", "#E36C8D"),
                            dataRetabliesChartY(props.label, "#86DBD4", "#86DBD4"),
                            dataDecesChartY(props.label, "#F6D37B", "#F6D37B"),
                        ]
                    }
                }
            />

        </View>
    );

}

const styles = StyleSheet.create({

    chart: {
        height: 200,
        // backgroundColor:'#efefef',
    }
});