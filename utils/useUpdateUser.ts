import { supabase } from "./supabase";
import { Alert } from "react-native";

type params = {
    id: string,
    push_token: string
}

export default async function updateProfileToken(params: params) {
    try {
        const updates = {
            id: params.id,
            push_token: params.push_token,
            updated_at: new Date(),
        };

        let { error } = await supabase
            .from('profiles')
            .update(updates, { returning: "minimal" })
            .match({ id: updates.id })
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

    }
}