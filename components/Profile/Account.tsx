import { useState, useEffect, ReactNode } from "react";
import { supabase } from "../../utils/supabase";
import { StyleSheet, View, Alert, TextInput, Text, ScrollView } from "react-native";
import Button from "../../styles/button";
import Heading from "../../styles/heading";
import SubHeading from "../../styles/subheading";
import Colors from "../../utils/colors";
import Loading from "../Loading";
import { removeItem } from "../../utils/localStorage";



export default function Account({ profileInfo }: { profileInfo: any }) {

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [intolerances, setIntolerances] = useState("");
    const [excluded, setExcluded] = useState("")
    const [diet, setDiet] = useState("")
    const [dietary_needs, setDietaryNeeds] = useState({});
    const [avatar_url, setAvatarUrl] = useState("");
    const [focused, setFocused] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(true)

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
            const user = supabase.auth.user();
            if (!user) throw new Error("No user on the session!");

            const updates = {
                id: user.id,
                username: user.email,
                dietary_needs: {
                    diet,
                    intolerances,
                    excluded
                },
                avatar_url,
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
            <SubHeading>We'll filter out the things you don't like or need to bring you the most efficient and relevant recipes </SubHeading>
            <View style={styles.verticallySpaced}>
                <ScrollView>
                    <Text>Diet</Text>
                    <TextInput
                        placeholder={"Ex. Vegetarian, Vegan, Pescetarian"}
                        value={diet || ""}
                        onChangeText={(text) => setDiet(text)}
                        style={[!focused ? styles.input : styles.inputFocused]}
                    />
                    <View style={styles.tagRow}>
                        <ScrollView horizontal>
                            {
                                diet.length >= 1 && (
                                    diet.split(",").map(item => (


                                        <View key={item} style={styles.tag}>
                                            <Text style={styles.tagItem}>{item}</Text>

                                        </View>

                                    ))
                                )
                            }
                        </ScrollView>
                    </View>
                    <Text>Food Intololerances</Text>
                    <TextInput
                        placeholder={"Ex. Dairy, Pork"}
                        value={intolerances || ""}
                        onChangeText={(text) => setIntolerances(text)}
                        style={[!focused ? styles.input : styles.inputFocused]}
                    />
                    <View style={styles.tagRow}>
                        <ScrollView horizontal>
                            {
                                intolerances.length >= 1 && (
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
                        placeholder={"Ex. Pistacios, Peaunut Butter"}
                        value={excluded || ""}
                        onChangeText={(text) => setExcluded(text)}
                        style={[!focused ? styles.input : styles.inputFocused]}
                    />
                    <View style={styles.tagRow}>
                        <ScrollView horizontal>
                            {
                                excluded.length >= 1 && (
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
                >{loading ? "Loading ..." : "Save"}</Button>
                <Button
                    style={{ width: '50%', marginTop: 0 }}
                    disabled={loading} onPress={() => {
                        supabase.auth.signOut()
                        removeItem('user')
                        removeItem('favorites')

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
        marginVertical: 16
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