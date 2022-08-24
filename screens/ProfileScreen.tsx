import React from 'react'
import { Text, Alert, StyleSheet, View } from 'react-native'
import Account from '../components/Profile/Account'
import Loading from '../components/Loading'
import { useUserContext } from '../context/user'
import Container from '../styles/container'

export default function ProfileScreen({ navigation }: any) {

    const { profileInfo } = useUserContext()
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {

    }, []);

    if (loading || !profileInfo) return <Loading />
    return (
        <>
            <Container style={{ padding: 16 }}>
                <Account profileInfo={profileInfo} />
            </Container>
        </>
    )
}

const styles = StyleSheet.create({

})
