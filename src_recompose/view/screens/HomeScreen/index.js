import React from 'react'
import PropTypes from 'prop-types';
import {compose, withHandlers } from 'recompose';
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

const HomeScreen = ({ navigateToDrawer }) => {
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

const enhange = compose(
    withHandlers({
        navigateToDrawer: props => args => props.navigation.push("Drawer")
    })
)

HomeScreen.propTypes = {
    navigateToDrawer: PropTypes.func
}

export default enhange( HomeScreen )
