import Variables from "./Variables"

const SPOONACULAR_KEY = process.env.SPOONACULAR_KEY || Variables.SPOONACULAR_KEY

export async function UseFetchRecipes({ query, dietary_needs, }: { query?: string, dietary_needs?: any }) {
    const RECIPE_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_KEY}&query=${query}&diet=${dietary_needs?.diet}&intolerances=${dietary_needs?.intolerances}&excludeIngredients=${dietary_needs?.excludeIngredients}&number=10&sort=random`


    try {
        const res = await fetch(RECIPE_URL, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        let session = await res.json()
        return session
    } catch (error) {

    }

}



export async function UseGetRecipeInfo({ id }: { id: number }) {
    const RECIPE_URL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_KEY}`

    const res = await fetch(RECIPE_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    let session = await res.json()

    return session


}

export async function UseGetFavoritesInfo({ ids }: { ids: string }) {
    const RECIPE_URL = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${SPOONACULAR_KEY}&ids=${ids}`

    const res = await fetch(RECIPE_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    let session = await res.json()

    return session


}

type params = {
    query?: string,
    type?: string,
    cuisine?: string,
    diet?: string,
    includeIngredients?: string,
    excludeIngredients?: string
    number?: number,
    offset?: number
}

export async function UseGetRecipeVideos(params: params) {

    const RECIPE_URL = `https://api.spoonacular.com/food/videos/search?apiKey=${SPOONACULAR_KEY}&query=${params.query}&diet=${params.diet}&excludeIngredients=${params.excludeIngredients}&type=${params.type}&number=10&offset=${params.offset}`

    const res = await fetch(RECIPE_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    let session = await res.json()

    return session

}

export async function useGetRandomJoke() {
    const RECIPE_URL = `https://api.spoonacular.com/food/jokes/random?apiKey=${SPOONACULAR_KEY}`

    const res = await fetch(RECIPE_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    let session = await res.json()


    return session
}

export async function useGetRandomTrivia() {
    const RECIPE_URL = `https://api.spoonacular.com/food/trivia/random?apiKey=${SPOONACULAR_KEY}`

    const res = await fetch(RECIPE_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    let session = await res.json()

    return session
}
export async function useGetRandomRecipes(tags: string) {
    const RECIPE_URL = `https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_KEY}&number=10&tags=${tags}`

    const res = await fetch(RECIPE_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    let session = await res.json()

    return session
}
type chatBotParams = {
    text: string,
    contextId: string
}
export async function useTalkToBot(params: chatBotParams) {
    const RECIPE_URL = `https://api.spoonacular.com/food/converse?apiKey=${SPOONACULAR_KEY}&text=${params.text}&contextId=${params.contextId}`

    const res = await fetch(RECIPE_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    let session = await res.json()


    return session
}

type cardParams = {
    id: number,
    mask: string,
    backgroundImage: string,
    backgroundColor: string,
    fontColor: string,
}
export async function useGetRecipeCard(params: cardParams) {
    const RECIPE_URL = `https://api.spoonacular.com/recipes/${params.id}/card?apiKey=${SPOONACULAR_KEY}&mask=${params.mask}&backgroundImage=${params.backgroundImage}&backgroundColor=${params.backgroundColor}&fontColor=${params.fontColor}`

    const res = await fetch(RECIPE_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    let session = await res.json()

    return session
}

export async function useGetSimilarRecipes(id: number) {
    const RECIPE_URL = `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${SPOONACULAR_KEY}&number=5`

    const res = await fetch(RECIPE_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    let session = await res.json()

    return session
}


export async function useSearchAutoComplete(query: string) {
    const RECIPE_URL = `https://api.spoonacular.com/recipes/autocomplete?apiKey=${SPOONACULAR_KEY}&query=${query}&number=10`


    const res = await fetch(RECIPE_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },

    })

    let session = await res.json()


    return session


}



