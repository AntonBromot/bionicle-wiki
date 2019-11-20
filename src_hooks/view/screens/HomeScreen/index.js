import React, { useCallback } from 'react'
import Video from "react-native-video"

import ButtonComponent from "../../components/Button"
import VIDEOS from "../../../resources/videos"
import { videoStyles, MainText, YellowText, Container } from "./styles"

const TEXT = {
    welcome: "welcome to",
    bionicle: "bionicle",
    wiki: "wiki",
    button: "start legend"
}

const HomeScreen = ({ navigation }) => {
    const navigateToDrawer = useCallback( () => navigation.push("Drawer"), [] )

    const bgVideoProps = {
            source: VIDEOS.homeBackground,
            muted: true,
            repeat: true,
            resizeMode: "cover",
            rate: 1.0,
            ignoreSilentSwitch: 'obey',
            style: videoStyles.backgroundVideo
          };

    return (
        <>
            <Video { ...bgVideoProps } />
            <Container>
                <MainText>{ TEXT.welcome } <YellowText>{ TEXT.bionicle }</YellowText> { TEXT.wiki }</MainText>
                <ButtonComponent title={ TEXT.button } onPress={ navigateToDrawer } />
            </Container>
       </>
)}



export default HomeScreen
