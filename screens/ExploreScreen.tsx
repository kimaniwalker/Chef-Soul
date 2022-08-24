import React from 'react'
import { ScrollView } from 'react-native'
import CategoryThumbnail from '../components/Category/CategoryThumbnail'
import Header from '../components/Header'
import Recommended from '../components/Explore/Recommended'
import Videos from '../components/Explore/Videos'


type ExploreProps = {

}



export default function ExploreScreen(props: ExploreProps) {


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
