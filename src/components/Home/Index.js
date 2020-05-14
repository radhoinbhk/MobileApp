import React, { useState, useEffect } from "react";
import { View, Dimensions, ScrollView, processColor, RefreshControl } from 'react-native';
import { Button, Card, Title, Paragraph, Avatar, IconButton, TouchableRipple } from 'react-native-paper';
import { LineChart } from "react-native-chart-kit";
import FlashMessage, { showMessage } from "react-native-flash-message";
import LineCharte from "../Common/LineCharte";
import Header from '../Common/Header'
import Loader from "../Common/Loader";
import { useSelector, useDispatch } from "react-redux";
import { getStatistiCovid } from "../../redux/Action/HomeAction";
import moment from "moment";
import BarChartScreen from "../Common/BarChartScreen";

export default function Home(props) {
  const [evolutionDesCasVisibel, setEvolutionDesCasVisibel] = useState(true)
  const [personneRetabliesVisibel, setPersonneRetabliesVisibel] = useState(true)
  const [personneDecesVisibel, setPersonneDecesVisibel] = useState(true)
  const [refreshing, setRefreshing] = useState(false);
  const screenWidth = Math.round(Dimensions.get('window').width);
  const isLoading = useSelector((state) => state.HomeReducer.isLoading)
  const saveCasConfirmes = useSelector((state) => state.HomeReducer.saveCasConfirmes)
  const saveNombreDeces = useSelector((state) => state.HomeReducer.saveNombreDeces)
  const saveCasRetablis = useSelector((state) => state.HomeReducer.saveCasRetablis)
  const evolutionDesCas = useSelector((state) => state.HomeReducer.evolutionDesCas)
  const personneRetablies = useSelector((state) => state.HomeReducer.personneRetablies)
  const personneDeces = useSelector((state) => state.HomeReducer.personneDeces)
  const statistiqueParGouvernorat = useSelector((state) => state.HomeReducer.statistiqueParGouvernorat)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStatistiCovid())
  }, [])


  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getStatistiCovid())
    setRefreshing(false);
  }

  // const evolutionArray = () => {
  //   const array = []
  //   evolutionDesCas.map(data =>
  //     array.push({ x: data.attributes.Total_Confirmed, y: moment.unix(data.attributes.Dates / 1000).format('DD/MM/YYYY') })
  //   )
  //   return array
  // }
  return (
    <View>
      <Header navigation={props.navigation} />
      {isLoading ?
        <Loader />
        :
        <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={{ alignItems: "center", marginTop: 30, flexDirection: "row", justifyContent: "center" }}>
            <Card style={{ width: "30%", marginRight: 10, backgroundColor: "rgb(0, 175, 128)" }}>
              <TouchableRipple style={{ height: 159, justifyContent: "center" }} onPress={() => setPersonneRetabliesVisibel(!personneRetabliesVisibel)}>
                <Card.Content style={{ alignItems: "center" }}>
                  <Avatar.Icon color="rgb(0, 175, 128)" icon="heart-pulse" style={{ backgroundColor: "#fff" }} />
                  <Title style={{ color: "#fff", fontSize: 16 }}>RÉTABLI</Title>
                  <Paragraph style={{ color: "#fff" }}>{saveCasRetablis}</Paragraph>
                </Card.Content>
              </TouchableRipple>
            </Card>
            <Card style={{ backgroundColor: "#E75131", width: "30%", marginRight: 10 }}>
              <TouchableRipple style={{ height: 159, justifyContent: "center" }} onPress={() => setEvolutionDesCasVisibel(!evolutionDesCasVisibel)}>
                <Card.Content style={{ alignItems: "center" }}>
                  <Avatar.Icon color="#E75131" icon="account-alert" style={{ backgroundColor: "#fff" }} />
                  <Title style={{ color: "#fff", fontSize: 16 }}>CONFIRMÉ</Title>
                  <Paragraph style={{ color: "#fff" }}>{saveCasConfirmes}</Paragraph>
                </Card.Content>
              </TouchableRipple>
            </Card>
            <Card style={{ backgroundColor: "rgb(133, 133, 133)", width: "30%" }}>
              <TouchableRipple style={{ height: 159, justifyContent: "center" }} onPress={() => setPersonneDecesVisibel(!personneDecesVisibel)}>
                <Card.Content style={{ alignItems: "center" }}>
                  <Avatar.Icon color="rgb(133, 133, 133)" icon="grave-stone" style={{ backgroundColor: "#fff" }} />
                  <Title style={{ color: "#fff", fontSize: 16, alignItems: "center" }}>DÉCÈS</Title>
                  <Paragraph style={{ color: "#fff" }}>{saveNombreDeces}</Paragraph>
                </Card.Content>
              </TouchableRipple>
            </Card>
          </View>
          <ScrollView horizontal={true}>
            <View style={{ flex: 1, width: screenWidth * 3, paddingRight: 10, paddingLeft: 10 }}>
              <LineCharte
                data={evolutionDesCasVisibel ? evolutionDesCas : []}
                dataRetablies={personneRetabliesVisibel ? personneRetablies : []}
                dataDeces={personneDecesVisibel ? personneDeces : []}
                FormaX='HH'
                titel={`Evolution des cas`}
                label="temperature"
              // color="#f1d7b0"
              // lineColor="#f39911"
              />
            </View>
          </ScrollView>
          <View style={{ flex: 1, width: screenWidth, paddingRight: 10, paddingLeft: 10 }}>
            <BarChartScreen data={statistiqueParGouvernorat} />
          </View>
        </ScrollView>}
    </View>
  );
}

