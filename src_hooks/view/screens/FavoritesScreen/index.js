import React, { useRef, useState, useCallback, useMemo, useEffect, memo } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux'
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

const RenderCards = memo(({ cards, dropZoneChange, onDragRemove }) => cards.map( ( item, index ) => {
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
}))

const ItemsByType = memo( ({ items, dropZoneChange, onDragRemove }) => items.map( ( typeCollection, index ) => {
    const type = BIONICLE_TYPES_BY_NUMBER[ index + 1]

    if ( !typeCollection.length ) return null

    return (
         <ItemsContainer key={index}>
             <TypeContainer>
                 <TypeContainerWithText>
                     <TypeTextInContainer>Favorites</TypeTextInContainer>
                 </TypeContainerWithText>
                 <TypeText>{ type }</TypeText>
             </TypeContainer>
             <Container >
                 <RenderCards { ...{ dropZoneChange, onDragRemove, cards: typeCollection } } />
             </Container>
         </ItemsContainer>
    )
}))

const renderCellCallback = ({ item }, dropZoneChange, onDragRemove ) => {
    const indexWithYear = item.findIndex( data =>  data[0] && data[0].year ),
          year = item[indexWithYear][0]?.year

    if ( !year ) return null

    return (
        <>
            <YearContainer>
                <YearText>{ year }</YearText>
                <YearContainerWithText>
                    <YearTextInContainer>Collection</YearTextInContainer>
                </YearContainerWithText>
            </YearContainer>
            <ItemsByType { ...{ items: item, dropZoneChange, onDragRemove } } />
        </>
    )
}

const searchHandlerCallback = ( text, setFavoritesList, favorites ) => {
    const data = searchData( favorites, text )
    setFavoritesList( data  )
}

const dragRemoveCallback = ( id, getFavorites, removeFavorite ) => {
    removeFavorite( id )
    getFavorites( f=>f )
}

const dropZoneChangeCallback = ( forShow, newPosition, scrollEnabled, setDropZonePosition, setScrollEnabled, dropZone ) => {
    const dropZoneConfig = { toValue: forShow ? 150 : 0, duration: 600 };

    setDropZonePosition( current => newPosition || current )
    setScrollEnabled(scrollEnabled)
    Animated.timing( dropZone, dropZoneConfig ).start()
}

const EmptyScreen = ({ navigation }) => {
    const goToCollections = useCallback( () => navigation.push("Collections"), [] )

    return (
        <ImageBackground source={ IMAGES.collectionsBackground } >
            <TextForEmpty>{ ASSETS.listEmptyText1 }<TextLink onPress={goToCollections}>{ ASSETS.collectionText2 }</TextLink>{ ASSETS.listEmptyText2 }</TextForEmpty>
        </ImageBackground>
    )
}

const FavoritesScreen = ({ getFavorites, favorites, removeFavorite, favoritesIds, navigation }) => {
    if ( !favoritesIds.length ) return <EmptyScreen { ...{ navigation } }/>

    const [ favoritesList, setFavoritesList ] = useState([]),
          [ dropZonePosition, setDropZonePosition ] = useState(null),
          [ scrollEnabled, setScrollEnabled ] = useState(true),
          { current: dropZone } = useRef( new Animated.Value(0) ),
          dropZoneChange = useCallback( ( forShow, newPosition, scrollEnabled ) => dropZoneChangeCallback( forShow, newPosition, scrollEnabled, setDropZonePosition, setScrollEnabled, dropZone ), []),
          onDragRemove = useCallback( id => dragRemoveCallback( id, getFavorites, removeFavorite ), []),
          searchHandler = useCallback( text => searchHandlerCallback( text, setFavoritesList, favorites ), [ favorites, favoritesList ]),
          renderItemCall = useCallback(data => renderCellCallback(data, dropZoneChange, onDragRemove), [] ),
          dataForRender = useMemo( () => get3dMatrix( favoritesList ), [favoritesList]);

    const dropZoneHeight = dropZone.interpolate({ inputRange: [ 0, 150 ], outputRange: [ 0, 150 ], extrapolate: 'clamp' }),
          dropZoneOpacity = dropZone.interpolate({ inputRange: [0, 150], outputRange: [0, 1], extrapolate: 'clamp' }),
          dropZoneStyles = { ...dropZonePosition, height: dropZoneHeight, opacity: dropZoneOpacity };

    useEffect( () => {
        getFavorites( favorites => setFavoritesList( favorites ) )
    }, [])

    return (
        <ImageBackground source={ IMAGES.collectionsBackground } >
            <KeyboardAvoidingView>
                <SearchBar searchHandler={searchHandler} />
                <FlatList scrollEnabled={scrollEnabled} data={dataForRender}
                          contentContainerStyle={{ paddingBottom: 60 }}
                          renderItem={ renderItemCall }
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

FavoritesScreen.propTypes = {
    navigation: PropTypes.object,
    favoritesIds: PropTypes.array,
    removeFavorite: PropTypes.func,
    favorites: PropTypes.array,
    getFavorites: PropTypes.func,
}

export default connect( mapStateToProps, mapDispatchToProps )( FavoritesScreen )

