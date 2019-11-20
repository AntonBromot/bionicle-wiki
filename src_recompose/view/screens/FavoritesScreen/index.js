import * as React from 'react';
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux'
import {compose, withHandlers, withStateHandlers, lifecycle } from 'recompose';
import { Animated } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import { ImageBackground, Container, YearContainer, YearContainerWithText, YearText,
         TypeContainer, TypeContainerWithText, TypeText, ItemsContainer, YearTextInContainer,
         TypeTextInContainer, AnimatedHeaderContainer, TextForEmpty, TextLink } from "./styles"
import IMAGES from "../../../resources/images"
import { BIONICLE_TYPES, BIONICLE_TYPES_BY_NUMBER } from "../../../constants/helpers"
import SearchBar from "../../components/SearchBar"
import { getFavorites, removeFavorite } from '../../../store/actions/favoritesActions';
import CatalogCard from '../../components/CatalogCard';
import Draggable from "../../components/Draggable"
import FadeInWrapper from '../../components/FadeInWrapper';
import HintForPan from "../../components/HintForPan"

const ASSETS = {
    favoritesText: "Favorites",
    collectionText: "Collection",
    listEmptyText1: "Your favorites list is empty! Go to ",
    listEmptyText2: " and add model you like!",
    collectionText2: "COLLECTION"
}

const get3dMatrix = items => {
    const matrix = []

    let years = [], mainIndex = 0

    items.forEach( ({ year }) => !years.includes( year ) && years.push( year ) )

    years = years.sort( ( a, b ) => a - b )

    for ( let currentYear of years ) {
        const itemsByYearArray = items.filter( ({ year }) => currentYear === year ),
              bionicleTypes = Object.values(BIONICLE_TYPES).map(({ type }) => type)

        let insideYearIndex = 0

        for ( let bionicleType of bionicleTypes ) {
            matrix[mainIndex] = matrix[mainIndex] || []
            matrix[mainIndex][insideYearIndex] = itemsByYearArray.filter( ({ type }) => bionicleType === type )
            insideYearIndex++
        }

        mainIndex++;
    }

    return matrix
}

const searchData = ( list, searcheble ) => list.filter( ({type, name, year, hierarchy }) => {
    const bionicleType = BIONICLE_TYPES_BY_NUMBER[type],
        searchString = String(hierarchy + year + name + bionicleType).toLowerCase();

    searcheble = searcheble.toLowerCase()

    return searchString.includes( searcheble )
})

const RenderCards = ({ cards, dropZoneChange, onDragRemove }) => cards.map( ( item, index ) => {

    const onDragSuccess = () => onDragRemove( item.id ),
          duration = 600,
          delay = index * 600;

    return (
            <Draggable { ...{ onDragSuccess, dropZoneChange, key: index } } >
                <FadeInWrapper { ...{ duration, delay }} >
                    <TouchableOpacity onPress={()=> console.log("PRESSED")} >
                        <CatalogCard { ...{ ...item, showFavoriteIcon: false } } />
                    </TouchableOpacity>
                </FadeInWrapper>
            </Draggable>
    )
})

const ItemsByType = ({ items, dropZoneChange, onDragRemove }) => items.map( ( typeCollection, index ) => {
    const type = BIONICLE_TYPES_BY_NUMBER[ index + 1]

    if ( !typeCollection.length ) return null

    return (
         <ItemsContainer key={index}>
             <TypeContainer>
                 <TypeContainerWithText>
                     <TypeTextInContainer>{ ASSETS.favoritesText }</TypeTextInContainer>
                 </TypeContainerWithText>
                 <TypeText>{ type }</TypeText>
             </TypeContainer>
             <Container >
                 <RenderCards { ...{ dropZoneChange, onDragRemove, cards: typeCollection } } />
             </Container>
         </ItemsContainer>
    )
})

const renderCell = ({ item }, dropZoneChange, onDragRemove ) => {
    const indexWithYear = item.findIndex( data =>  data[0] && data[0].year ),
          year = item[indexWithYear][0]?.year

    if ( !year ) return null

    return (
        <>
            <YearContainer>
                <YearText>{ year }</YearText>
                <YearContainerWithText>
                    <YearTextInContainer>{ ASSETS.collectionText }</YearTextInContainer>
                </YearContainerWithText>
            </YearContainer>
            <ItemsByType { ...{ items: item, dropZoneChange, onDragRemove } } />
        </>
    )
}

const EmptyScreen = ({ navigation }) => {
    const goToCollections = () => navigation.push("Collections")

    return (
        <ImageBackground source={ IMAGES.collectionsBackground } >
            <TextForEmpty>{ ASSETS.listEmptyText1 }<TextLink onPress={goToCollections}>{ ASSETS.collectionText2 }</TextLink>{ ASSETS.listEmptyText2 }</TextForEmpty>
        </ImageBackground>
    )
}

const FavoritesScreen = ({ favoritesList, searchHandler, dropZone, dropZonePosition, dropZoneChange, scrollEnabled, onDragRemove, favoritesIds, navigation }) => {
    if ( !favoritesIds.length ) return <EmptyScreen { ...{ navigation } }/>

    const dataForRender = get3dMatrix( favoritesList ),
          dropZoneHeight = dropZone.interpolate({ inputRange: [ 0, 150 ], outputRange: [ 0, 150 ], extrapolate: 'clamp' }),
          dropZoneOpacity = dropZone.interpolate({ inputRange: [0, 150], outputRange: [0, 1], extrapolate: 'clamp' }),
          dropZoneStyles = { ...dropZonePosition, height: dropZoneHeight, opacity: dropZoneOpacity };

    return (
            <ImageBackground source={ IMAGES.collectionsBackground } >
                <KeyboardAvoidingView>
                    <SearchBar searchHandler={searchHandler} />
                    <FlatList scrollEnabled={scrollEnabled} data={dataForRender}
                              contentContainerStyle={{ paddingBottom: 60 }}
                              renderItem={data => renderCell(data, dropZoneChange, onDragRemove)}
                              keyExtractor={(item, index) => String(index)}/>
                    { dataForRender.length ? <HintForPan /> : null }
                </KeyboardAvoidingView>
                <AnimatedHeaderContainer style={ dropZoneStyles }>
                    <Icon name="trash" color="red" size={50}/>
                </AnimatedHeaderContainer>
            </ImageBackground>
    )
}

const mapStateToProps = ({ favorites: { favoritesIds, favorites, fetching } }) => ({ favorites, favoritesIds, fetching })

const mapDispatchToProps = dispatch => ({
    getFavorites: ( callback ) => dispatch( getFavorites( callback ) ),
    removeFavorite: ( id, callback ) =>  dispatch( removeFavorite( id, callback ) )
})

const enhange = compose(
    connect( mapStateToProps, mapDispatchToProps ),
    withStateHandlers(
        { favoritesList: [], dropZone: new Animated.Value(0), dropZonePosition: null, scrollEnabled: true },
        {
            setFavoritesToState: ({ favoritesList }) => newFavorites => ({ favoritesList: newFavorites }),
            setDropZonePosition: ({ dropZonePosition }) => ( newPosition, scrollEnabled ) => ({ scrollEnabled, dropZonePosition: newPosition || dropZonePosition })
        }
    ),
    lifecycle({
        componentDidMount() {
            const { getFavorites, setFavoritesToState } = this.props
            getFavorites( favorites => setFavoritesToState( favorites ) )
        }
    }),
    withHandlers({
        searchHandler: props => text => { props.setFavoritesToState( searchData(props.favorites, text ) ) },
        dropZoneChange: props => ( forShow, newPosition, scrollEnabled ) => {
            const { dropZone, setDropZonePosition } = props,
                dropZoneConfig = { toValue: forShow ? 150 : 0, duration: 600 };

            setDropZonePosition(newPosition, scrollEnabled)
            Animated.timing( dropZone, dropZoneConfig ).start()
        },
        onDragRemove: props => id => {
            props.removeFavorite( id )
            props.getFavorites( f=>f )
        }

    }),
)

FavoritesScreen.propTypes = {
    favoritesIds: PropTypes.array,
    favoritesList: PropTypes.array,
    searchHandler: PropTypes.func,
    dropZone: PropTypes.object,
    dropZoneChange: PropTypes.func,
    scrollEnabled: PropTypes.bool,
    onDragRemove: PropTypes.func,
}

export default enhange( FavoritesScreen )

