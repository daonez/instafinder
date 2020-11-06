import axios from 'axios'

const { REACT_APP_PIXABAY_API_KEY, REACT_APP_UNSPLASH_API_KEY } = process.env

const PIXABAY_URL = `https://pixabay.com/api/?key=${REACT_APP_PIXABAY_API_KEY}`
const UNSPLASH_URL = `https://api.unsplash.com/search/photos?client_id=${REACT_APP_UNSPLASH_API_KEY}`

export const searchAll = async (query) => {
    try {
        const unsplashResults = await searchUnsplash(query)
        // console.log(unsplashResults)
        const pixabayResults = await searchPixabay(query)
        // console.log(pixabayResults)
        const images = [...pixabayResults.pixabayImages, ...unsplashResults.unsplashImages]
        const numOfResults = unsplashResults.total + pixabayResults.totalHits
        return { images, numOfResults }
    } catch (error) {
        console.log(error)
        return []
    }
}

export const searchPageResults = async (query, page = 1) => {
    try {
        const unsplashResults = await searchUnsplash(query, page)
        // console.log(unsplashResults)
        const pixabayResults = await searchPixabay(query, page)
        // console.log(pixabayResults)
        const images = [...pixabayResults.pixabayImages, ...unsplashResults.unsplashImages]
        const numOfResults = unsplashResults.total + pixabayResults.totalHits
        return { images, numOfResults }
    } catch (error) {
        console.log(error)
        return []
    }
}

export const searchUnsplash = async (query, pages = 1) => {
    try {
        const res = await axios.get(
            `${UNSPLASH_URL}&query=${query}&per_page=5&page=${pages}&orientation=squarish`
        )
        const { data } = res
        // console.log(data)

        const { total, results } = data

        const unsplashImages = results.map((pics) => {
            return {
                imageLinks: pics.links.html,
                imageUrls: pics.urls.regular
            }
        })
        // console.log(unsplashResults)
        return { total, unsplashImages }
    } catch (error) {
        console.log(error)
        return []
    }
}

export const searchPixabay = async (query, pages = 1) => {
    try {
        const res = await axios.get(`${PIXABAY_URL}&q=${query}&image_type=photo&page=${pages}`)
        const { data } = res
        // console.log(data)

        const { totalHits, hits } = data

        const pixabayImages = hits.map((pics) => {
            return {
                imageLinks: pics.pageURL,
                imageUrls: pics.webformatURL
            }
        })
        // console.log(pixabayResults)
        return { totalHits, pixabayImages }
    } catch (err) {
        // Handle Error Here
        console.error(err)
        return []
    }
}
