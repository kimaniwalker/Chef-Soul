import React from 'react'
import { useSearchAutoComplete } from '../../utils/useFetchRecipes'
import { StyleSheet, TextInput, Platform, View, Alert } from 'react-native'
import Colors from '../../utils/colors'
import { InfiniteHits } from '../Search/InfiniteHits'

export default function Search() {
    const [value, setValue] = React.useState('')
    const [data, setData] = React.useState('')
    const [isFetching, setIsFetching] = React.useState(false)
    const [focused, setFocused] = React.useState(false)

    React.useEffect(() => {
        checkCount()
    }, [value])

    function checkCount() {
        //reduce amount of request being made. Request should be made after every 4 keystrokes
        if (value?.length >= 4 && value?.length % 2 === 0) {
            getData()
        }
    }

    async function getData() {
        setIsFetching(true)
        try {
            let data = await useSearchAutoComplete(value)
            setData(data)
            setIsFetching(false)

            if (data.status === 'failure') {
                Alert.alert(
                    "Something went wrong",
                    data.message,
                    [
                        { text: "OK" }
                    ]
                );
            }

        } catch (error: any) {
            Alert.alert(
                'Something went wrong',
                error.message,
                [{
                    text: 'okay',
                    style: 'destructive',
                }]
            );
        }
        setIsFetching(false)
    }

    return (
        <>
            <View style={{ justifyContent: 'flex-start', padding: 16 }}>

                <TextInput
                    onFocus={() => setFocused(true)}
                    style={[!focused ? styles.input : styles.inputFocused]}
                    onChangeText={(text) => setValue(text)}
                    value={value}
                    placeholder="What do you want to cook today ?"
                    autoCapitalize={'none'}

                />
                <InfiniteHits isFetching={isFetching} hits={data} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderWidth: 2,
        padding: 16,
        marginVertical: 16,
        borderRadius: 48
    },
    inputFocused: {
        width: '100%',
        borderWidth: 2,
        padding: 16,
        marginVertical: 16,
        backgroundColor: 'white',
        borderRadius: 48,
        borderColor: Colors.secondary,
        elevation: 4,
        shadowColor: 'lightgray',
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 9,
        shadowOpacity: 1,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
    },
})