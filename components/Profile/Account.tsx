import { useState, useEffect, ReactNode } from "react";
import { supabase } from "../../utils/supabase";
import { StyleSheet, View, Alert, TextInput, Text, ScrollView } from "react-native";
import Button from "../../styles/button";
import Heading from "../../styles/heading";
import SubHeading from "../../styles/subheading";
import Colors from "../../utils/colors";
import Loading from "../Loading";
import { removeItem } from "../../utils/localStorage";
import { useUserContext } from "../../context/user";
import { useFavoritesContext } from "../../context/favorites";
import DropDownPicker from 'react-native-dropdown-picker';



export default function Account({ profileInfo }: { profileInfo: any }) {
    const { setUserId, setIsAuthenticated } = useUserContext()
    const { favorites } = useFavoritesContext()
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [intolerances, setIntolerances] = useState("");
    const [excluded, setExcluded] = useState("")
    const [diet, setDiet] = useState("")
    const [dietary_needs, setDietaryNeeds] = useState({});
    const [avatar_url, setAvatarUrl] = useState("");
    const [focused, setFocused] = useState(false)
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Gluten Free', value: 'Gluten Free' },
        { label: 'Vegetarian', value: 'Vegetarian' },
        { label: 'Ketogenic', value: 'Ketogenic' },
        { label: 'Lacto-Vegetarian', value: 'Lacto-Vegetarian' },
        { label: 'Ovo-Vegetarian', value: 'Ovo-Vegetarian' },
        { label: 'Pescetarian', value: 'Pescetarian' },
        { label: 'Paleo', value: 'Paleo' },
        { label: 'Primal', value: 'Primal' },
        { label: 'Low FODMAP', value: 'Low FODMAP' },
        { label: 'Whole30', value: 'Whole30' }

    ]);

    useEffect(() => {

        if (profileInfo) {
            setLoading(true)
            setIntolerances(profileInfo?.dietary_needs.intolerances)
            setDiet(profileInfo?.dietary_needs.diet)
            setExcluded(profileInfo?.dietary_needs.excluded)
            setLoading(false)
        }
    }, [profileInfo])

    async function updateProfile({
        username,
        avatar_url,
        dietary_needs,
    }: {
        username: string;
        avatar_url: string;
        dietary_needs: object;
    }) {
        try {
            setLoading(true);

            const updates = {
                id: profileInfo.id,
                username: profileInfo.username,
                dietary_needs: {
                    diet,
                    intolerances,
                    excluded
                },
                avatar_url,
                favorites: favorites,
                updated_at: new Date(),
            };

            let { error } = await supabase
                .from("profiles")
                .upsert(updates, { returning: "minimal" });

            if (error) {
                throw error;
            }
        } catch (error: any) {
            Alert.alert(
                "Something went wrong",
                error.message,
                [
                    { text: "OK" }
                ]
            );
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Loading />
    return (

        <View style={{ width: '100%', flex: 1, marginTop: 30 }}>

            <Heading>Enter your special dietary needs.</Heading>
            <SubHeading>We'll filter out the things you don't like or need to bring you the most efficient and relevant recipes. All you need to do is separate each item with a comma. </SubHeading>
            <View style={styles.verticallySpaced}>
                <ScrollView>
                    <Text>Diet</Text>
                    <DropDownPicker
                        open={open}
                        value={diet}
                        items={items}
                        setOpen={setOpen}
                        setValue={setDiet}
                        setItems={setItems}
                        listMode="MODAL"
                        placeholder="Select a diet"
                        style={[!focused ? styles.input : styles.inputFocused]}
                    />

                    <Text>Food intolerances</Text>
                    <TextInput
                        placeholder={"Ex. Dairy,Pork"}
                        value={intolerances || ""}
                        onChangeText={(text) => setIntolerances(text)}
                        style={[!focused ? styles.input : styles.inputFocused]}
                    />
                    <View style={styles.tagRow}>
                        <ScrollView horizontal>
                            {
                                intolerances?.length >= 1 && (
                                    intolerances.split(",").map(item => (


                                        <View key={item} style={styles.tag}>
                                            <Text style={styles.tagItem}>{item}</Text>

                                        </View>

                                    ))
                                )
                            }
                        </ScrollView>
                    </View>
                    <Text>Excluded foods</Text>
                    <TextInput
                        placeholder={"Ex. Pistachios,Peaunut Butter"}
                        value={excluded || ""}
                        onChangeText={(text) => setExcluded(text)}
                        style={[!focused ? styles.input : styles.inputFocused]}
                    />
                    <View style={styles.tagRow}>
                        <ScrollView horizontal>
                            {
                                excluded?.length >= 1 && (
                                    excluded.split(",").map(item => (


                                        <View key={item} style={styles.tag}>
                                            <Text style={styles.tagItem}>{item}</Text>

                                        </View>

                                    ))
                                )
                            }
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>

            <View style={{ flexDirection: "row", flex: 0, padding: 16, justifyContent: 'center', alignItems: "flex-end", backgroundColor: Colors.light }}>

                <Button
                    style={{ width: '50%', marginTop: 0 }}
                    onPress={() => updateProfile({ username, dietary_needs, avatar_url })}
                    disabled={loading}
                >{loading ? "Saving..." : "Save"}</Button>
                <Button
                    style={{ width: '50%', marginTop: 0 }}
                    disabled={loading} onPress={() => {
                        removeItem('user')
                        removeItem('favorites')
                        setUserId(null)
                        setIsAuthenticated(false)
                    }}>Sign Out</Button>
            </View>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: "stretch",
    },
    mt20: {
        marginTop: 20,
    },
    input: {
        width: '100%',
        borderWidth: 2,
        padding: 16,
        marginVertical: 16,
        backgroundColor: 'transparent',
    },
    inputFocused: {
        width: '100%',
        borderWidth: 2,
        padding: 16,
        marginVertical: 8,
        backgroundColor: 'white'
    },
    tagRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'scroll',
        marginBottom: 8

    },
    tagItem: {
        fontSize: 14,
        color: 'white'
    },
    tag: {
        padding: 8,
        paddingHorizontal: 16,
        margin: 2,
        borderRadius: 48,
        backgroundColor: Colors.secondary,

    }
});