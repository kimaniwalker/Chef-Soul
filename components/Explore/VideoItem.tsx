import React from 'react';
import { View, StyleSheet, Button, Platform } from 'react-native';
import { WebView } from 'react-native-webview';


export default function VideoItem({ uri }: { uri: string }) {

    return (
        <View style={styles.container}>
            <WebView
                style={styles.video}
                source={{
                    html: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${uri}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        margin: 8, borderWidth: 2,
        marginBottom: 12,
        borderRadius: 8,
        borderColor: '#ccc',
        elevation: 4,
        shadowColor: 'lightgray',
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 9,
        shadowOpacity: 1,
        backgroundColor: 'white',
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
    },
    video: { height: 180, width: 320 }
});