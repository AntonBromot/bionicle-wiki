import React from 'react'
import PropTypes from 'prop-types';
import {compose, withHandlers, lifecycle } from 'recompose';
import Video from "react-native-video"

import ButtonComponent from "../../components/Button"
import VIDEOS from "../../../resources/videos"
import { videoStyles, MainText, YellowText, Container } from "./styles"
import {Linking} from 'react-native';

const TEXT = {
    welcome: "welcome to",
    bionicle: "bionicle",
    wiki: "wiki",
    button: "start legend"
}

const handleOpenURL = ({ url } , navigation ) => {
    const route = url?.replace(/.*?:\/\//g, ''),
        routeName = route?.split('/').pop();

    routeName && navigation.navigate( routeName )
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
        navigateToDrawer: props => args => props.navigation.push("Drawer"),
        deepLinkNavigate: ({ navigation }) => e => handleOpenURL(e, navigation)
    }),
    lifecycle({
        componentDidMount() {
            const { deepLinkNavigate } = this.props
            if (Platform.OS === 'android') Linking.getInitialURL().then( url => deepLinkNavigate({ url }) );
            else Linking.addEventListener('url', deepLinkNavigate );
        },
        componentWillUnmount() {
            const { deepLinkNavigate } = this.props
            Linking.removeEventListener('url', deepLinkNavigate );
        }
    })
)

HomeScreen.propTypes = {
    navigateToDrawer: PropTypes.func
}

export default enhange( HomeScreen )
