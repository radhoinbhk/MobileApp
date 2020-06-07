import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    processColor
} from 'react-native';
import { BarChart } from 'react-native-charts-wrapper';


export default BarChartScreen = (props) => {

    const legend = () => {
        return {
            enabled: false,
            textSize: 14,
            form: 'SQUARE',
            formSize: 14,
            xEntrySpace: 10,
            yEntrySpace: 5,
            formToTextSpace: 5,
            wordWrapEnabled: false,
            maxSizePercent: 0.5,
        }
    }

    const data = () => {
        const arrayValue = []
        props.data.map(value => arrayValue.push({ y: value.attributes.Nb_cas }))
        return {
            dataSets: [{
                values: arrayValue,
                label: '',
                config: {
                    color: processColor('teal'),
                    barShadowColor: processColor('lightgrey'),
                    highlightAlpha: 100,
                    // highlightColor: processColor('red'),
                }
            }],
            config: {
                barWidth: 0.3,
            }
        }
    }

    const xAxis = () => {
        const arrayValue = []
        props.data.map(value => arrayValue.push(value.attributes.gouvernora))
        return {
            valueFormatter: arrayValue,
            granularityEnabled: true,
            granularity: 1,
            position: 'TOP'
        }
    }

    // handleSelect = (event) => {
    //     let entry = event.nativeEvent
    //     if (entry == null) {
    //         this.setState({ ...this.state, selectedEntry: null })
    //     } else {
    //         this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) })
    //     }
    // }

    return (
        // <View style={{ flex: 1 }}>
        <View style={styles.container}>
            <Text
                style={{
                    fontSize: 14, color: "black", marginLeft: 15, marginTop: 10, marginBottom: 20,
                    fontWeight: "bold"
                }}
            >Nombre de cas confirmés par gouvernorat</Text>
            <BarChart
                style={styles.chart}
                data={data()}
                xAxis={xAxis()}
                animation={{ durationX: 2000 }}
                legend={legend()}
                gridBackgroundColor={processColor('#ffffff')}
                visibleRange={{ x: { min: 4, max: 4 } }}
                drawBarShadow={false}
                drawValueAboveBar={true}
                drawHighlightArrow={true}
                dragEnabled={true}
            />
        </View>
        // </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 270,
        // backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    }
});