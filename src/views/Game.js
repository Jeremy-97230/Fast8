import React, {useState, useRef, useEffect} from 'react'
import { StyleSheet, View, Vibration, Image } from 'react-native'
import {useStoreState} from 'easy-peasy'
import PlayManager from '../components/PlayManager'

// import components
import BtnReloadRef from '../components/game_components/BtnReloadRef'
import Infos from '../components/game_components/Infos'
import SnapSlider from '../components/game_components/SnapSlider'
import TableRef from '../components/game_components/TableRef'
import GameGrid from '../components/game_components/GameGrid'

const Game = () => {

    // init store
    const tableCubes = useStoreState((state) => state.tableCubes);
    
    //init state 
    const [cubeTable, setcubeTable] = useState(tableCubes)
    const [refTable, setrefTable] = useState(PlayManager.generateTabAlt(3, cubeTable))
    const [dataInfos, setdataInfos] = useState({score: 0, move: 0, oldMoves: []})
    const [moveInfo, setMoveInfo] = useState(0)
    const [scoreInfo, setScoreInfo] = useState(0)

    //init ref
    const oldMovesInfo = useRef([]).current
    const levelPoint = useRef(2)

    //updateRef
    const updateRef = () => {
        const newValue = levelPoint.current + PlayManager.getRandomInt(3);
        let result = [];
        let verif = true;
        while (verif) {
            result = PlayManager.generateTabAlt(newValue, cubeTable)
            verif = PlayManager.comparTabs(cubeTable, result, "idColor")
        }
        setrefTable(result)
        setMoveInfo(0)
    }

    // change bar animate
    const changeSnap = (level) =>{
        levelPoint.current = level
    }

    // init effect
    useEffect(() => {
      const result = PlayManager.comparTabs(cubeTable, refTable, "idColor")
      if (result) {
        // scrore update
        oldMovesInfo.unshift(moveInfo + 1)
        setMoveInfo(0)
        setScoreInfo((e)=> e+= 1)
        // update ref table
        updateRef()
        Vibration.vibrate(50)
      }else{
        setMoveInfo((e)=> e += 1)
      }
    }, [cubeTable])

    useEffect(() => {
        if (oldMovesInfo.length > 4){
            oldMovesInfo.pop()
        }
        setdataInfos({
            score: scoreInfo, 
            move: moveInfo, 
            oldMoves: oldMovesInfo
        })
    }, [moveInfo])

    // Render
    return (
        <View style={styles.container}>
            <Image 
                source={require("../assets/img/border_cover.png")}
                style={{ resizeMode: "contain", height: "100%", position: 'absolute', top: 0}}
            />
            <View style={styles.containerHeader}>
                <View style={styles.boxInHeader}>
                    <TableRef table={refTable}/>
                    <BtnReloadRef refUpdate={updateRef} />
                </View>
                <SnapSlider snapValue={changeSnap}/>
            </View>
            <View style={styles.containerBody}>
                <GameGrid key={cubeTable} tableGame={cubeTable} changeTableGame={setcubeTable} />
                <Infos infos={dataInfos}/>
            </View>
        </View>
    )

}

export default Game

//Style
const styles = StyleSheet.create({
    // style in game component
    container:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#383e6e",
        paddingHorizontal: 10,
    },
    containerHeader:{
        width: "100%",
        padding: 10,
        backgroundColor: "#515ba1cc",
        borderRadius: 30,
        marginTop: 50,
    },
    boxInHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    containerBody:{
        width: "100%",
        padding: 20,
        backgroundColor: "#515ba1",
        borderRadius: 30,
        marginTop: 20,
        justifyContent: 'center',
        alignItems:'center',
        paddingTop: 25,
    },
})