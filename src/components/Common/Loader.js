import React from 'react'
import LottieView from 'lottie-react-native';


export default function Loader(props) {

    return (
        <LottieView
            autoPlay={true}
            colorFilters={[{
                keypath: "button",
                color: "#F00000"
              },{
                keypath: "Sending Loader",
                color: "#F00000"
              }]}
            source={require('../../assets/18289-stay-home-stay-safe-red.json')}
            progress={0.5}
            loop={true}
            enableMergePathsAndroidForKitKatAndAbove
        />
    );
}