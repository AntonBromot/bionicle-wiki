import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Platform, Animated, ScrollView, TextInput, Button, FlatList } from 'react-native';
import FadeInWrapper from "../../components/FadeInWrapper"

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 200;
const ARRAY = Array.from( Array(20), (_, i) => i );


let data = [
        {"first_name":"ltorrejon0@si.edu"},
{"first_name" : "ichadbourne1@icq.com"},
{"first_name":"ascorthorne2@mediafire.com"},
{"first_name":"jlathwood3@xing.com"},
{"first_name":"molkowicz4@ftc.gov"},
{"first_name":"motridge5@tiny.cc"},
{"first_name":"rcess6@hostgator.com"},
{"first_name":"mmaundrell7@php.net"},
{"first_name":"ufairburne8@instagram.com"},
{"first_name":"pangel9@biglobe.ne.jp"}]


export default class App extends Component {

    state = {
        scrollYAnimatedValue: new Animated.Value(0)
    }

    renderElems = items => items.map((item, index) => {
        const duration = 500,
            delay = index * 200;

        return (
            <FadeInWrapper { ...{ duration, delay, index }} key={ index }>
                <View style={styles.item}>
                    <Text style={styles.itemText}>Row No : {item.first_name}</Text>
                </View>
            </FadeInWrapper>
        )
       }
    )

    renderItem = (item, index) => {

        return (
            <FadeInWrapper index={ index } >
                <Text>{ item.first_name }</Text>
            </FadeInWrapper>
        );
    }

    _keyExtractor = (item, index) => item.id;


    render() {
        const { scrollYAnimatedValue } = this.state;

        const headerHeight = scrollYAnimatedValue.interpolate( {
                inputRange: [0, 150 ],
                outputRange: [ 200, 50 ],
                extrapolate: 'clamp'
            });

        const headerBackgroundColor = scrollYAnimatedValue.interpolate( {
                inputRange: [0, 200],
                outputRange: ['#e91e63', '#1DA1F2'],
                extrapolate: 'clamp'
            });





            return (
                <ScrollView keyExtractor={this._keyExtractor}
                    data={data }
                    renderItem={ this.renderItem.bind(this) }
                >
                    { this.renderElems( data ) }
                </ScrollView>
            );

        return (
            <View style={styles.container} >


                <View style={{ flex: 1, }}>
                    <ScrollView  scrollEventThrottle={16}>
                                    { this.renderElems( ARRAY ) }
                    </ScrollView>
                </View>




            </View>
        );

        return (
            <View style={styles.container} >

                <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight, backgroundColor: headerBackgroundColor }]}>
                    <Text style={styles.headerText}>Animated Header</Text>
                </Animated.View>
                <Animated.View style={{ paddingTop: headerHeight, flex: 1, }}>
                    <ScrollView  scrollEventThrottle={16}
                                onScroll={ Animated.event( [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } }] )}>
                        { this.renderElems( ARRAY ) }
                    </ScrollView>
                </Animated.View>




            </View>
        );
    }
}



const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: "center",

        },
        animatedHeaderContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10
        },
        headerText: {
            color: 'white',
            fontSize: 22
        },
        item: {
            backgroundColor: '#ff9e80',
            margin: 8,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center'
        },
        itemText: {
            color: 'black',
            fontSize: 16
        }

    });



