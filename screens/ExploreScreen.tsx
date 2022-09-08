import React from 'react'
import { ScrollView, Button } from 'react-native'
import CategoryThumbnail from '../components/Category/CategoryThumbnail'
import Header from '../components/Header'
import Recommended from '../components/Explore/Recommended'
import Videos from '../components/Explore/Videos'
import Loading from '../components/Loading'
import Search from '../components/Search/Index'


type ExploreProps = {

}




export default function ExploreScreen(props: ExploreProps) {

    const [results, setResults] = React.useState<any>("")
    const [isFetching, setIsFetching] = React.useState(false)


    if (isFetching) return <Loading />
    return (
        <>
            <Header />
            <ScrollView>
                <CategoryThumbnail />
                <Recommended />
                <Videos />
            </ScrollView>
        </>
    )
}
