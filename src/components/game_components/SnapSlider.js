import React, {useRef} from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import {useStoreState} from 'easy-peasy'

const SnapSlider = ({snapValue}) =>{

    //init store
    const IdLang = useStoreState((state) => state.langues);
    const lang = useStoreState((state) => state.stringLang)[IdLang];
    const getColors = useStoreState((state) => state.getColors);

    //styles
    const styles = StyleSheet.create(dataStyle(getColors))

    //init ref
    const slideSnapBar = useRef(new Animated.Value(0)).current

    // change bar animate
    const changeSnap = (data) =>{
        Animated.timing(slideSnapBar, {
            toValue: data.n,
            duration: 500,
            useNativeDriver: false
        }).start();
        snapValue(data.level)
    }

    // interpolation actions
    const SlideInterpolate =  slideSnapBar.interpolate({
        inputRange: [0, 100],
        outputRange:["0%" , "100%"]
    })
    const middleBottomInterpolate =  slideSnapBar.interpolate({
        inputRange: [0, 50],
        outputRange:[getColors.backSecomdary , "#00f"]
    })
    const endBottomInterpolate =  slideSnapBar.interpolate({
        inputRange: [0 ,50, 100],
        outputRange:[getColors.backSecomdary, getColors.backSecomdary , "#00f"]
    })
    const snapTextStartInterpolate =  slideSnapBar.interpolate({
        inputRange: [0 ,50, 100],
        outputRange:["900", "300" , "300"]
    })
    const snapTextMiddletInterpolate =  slideSnapBar.interpolate({
        inputRange: [0 ,50, 100],
        outputRange:["300", "900" , "300"]
    })
    const snapTextEndInterpolate =  slideSnapBar.interpolate({
        inputRange: [0 ,50, 100],
        outputRange:["300", "300" , "900"]
    })

    return(
        <View style={styles.containerSnap}>
            <View style={styles.containerLines}>
                <View style={styles.snapBacklLine}>
                    <Animated.View style={[styles.snapLine, {width: SlideInterpolate}]} />
                </View>
                <Animated.View style={styles.snapBull} onStartShouldSetResponderCapture={()=> changeSnap({n: 0, level: 2})} />
                <Animated.View style={[styles.snapBull, {backgroundColor: middleBottomInterpolate}]} onStartShouldSetResponderCapture={()=> changeSnap({n: 50, level:4})} />
                <Animated.View style={[styles.snapBull, {backgroundColor: endBottomInterpolate}]} onStartShouldSetResponderCapture={()=> changeSnap({n: 100, level: 7})} />
            </View>
            <View style={styles.snapBoxText}>
                <Animated.Text style={[styles.snapText, {fontWeight: snapTextStartInterpolate}]}>{lang.sliderText_1}</Animated.Text>
                <Animated.Text style={[styles.snapText, {fontWeight: snapTextMiddletInterpolate}]}>{lang.sliderText_2}</Animated.Text>
                <Animated.Text style={[styles.snapText, {fontWeight: snapTextEndInterpolate}]}>{lang.sliderText_3}</Animated.Text>

            </View>
        </View>
    )
}


export default SnapSlider

const dataStyle = (getcolor) => {

    return {
        containerSnap:{
            width: "100%",
            paddingVertical: 10,
            paddingHorizontal: 15,
        },
        snapBull:{
            width: 30,
            height: 30,
            backgroundColor: "#00f",
            borderRadius: 15,
            elevation: 2,
        },
        containerLines:{
            width:"100%",
            position: 'relative',
            flexDirection: "row",
            alignItems: "center",
            justifyContent:"space-between"

        },
        snapBacklLine:{
            position:"absolute",
            backgroundColor: getcolor.backPrimary,
            width: "100%",
            height: 10,
            transform: [{scaleX: 0.90}]
        },
        snapLine:{
            backgroundColor: "#55f",
            height: "100%",
        },
        snapBoxText:{
            flexDirection: "row",
            justifyContent: "space-between",
        },
        snapText:{
            fontWeight: '900',
            color:"#fff",
        }
    }
}