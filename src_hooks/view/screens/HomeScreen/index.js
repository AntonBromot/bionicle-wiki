import React, { useCallback, useEffect } from 'react'
import Video from "react-native-video"
import {Linking} from 'react-native';

import ButtonComponent from "../../components/Button"
import VIDEOS from "../../../resources/videos"
import { videoStyles, MainText, YellowText, Container } from "./styles"

const TEXT = {
    welcome: "welcome to",
    bionicle: "bionicle",
    wiki: "wiki",
    button: "start legend"
}

const handleOpenURL = ( { url }, navigation ) => {
    const route = url?.replace(/.*?:\/\//g, ''),
          routeName = route?.split('/').pop();

    routeName && navigation.navigate( routeName )
}

const HomeScreen = ({ navigation }) => {
    const navigateToDrawer = useCallback( () => navigation.push("Drawer"), [] ),
          deepLinkNavigate = useCallback( e => handleOpenURL( e, navigation ), [])

    const bgVideoProps = {
            source: VIDEOS.homeBackground,
            muted: true,
            repeat: true,
            resizeMode: "cover",
            rate: 1.0,
            ignoreSilentSwitch: 'obey',
            style: videoStyles.backgroundVideo
          };

    useEffect( () => {
        if (Platform.OS === 'android') Linking.getInitialURL().then( url => deepLinkNavigate({url})  );
        else Linking.addEventListener('url', deepLinkNavigate);

        return () => { Linking.removeEventListener('url', deepLinkNavigate) }
    }, [] )

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
