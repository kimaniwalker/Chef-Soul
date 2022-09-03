import React from 'react';
import { View, StyleSheet, Button, Platform } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Loading from '../Loading';



export default function VideoItem({ uri }: { uri: string }) {
    const [isReady, setIsReady] = React.useState(false)

    React.useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!isReady) return <Loading />
    return (
        <View style={styles.container}>
            <YoutubePlayer
                height={200}
                width={340}
                videoId={uri}
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