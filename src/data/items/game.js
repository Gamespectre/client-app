import mobservable from 'mobservable'
import convertDatamodelData from '../utils/convertDatamodelData'

export default function(game) {
    let gameData = convertDatamodelData(game)

    return mobservable.makeReactive({
        id: gameData.id,
        slug: gameData.slug,
        title: gameData.title,
        image: gameData.image,
        rating: gameData.rating,
        year: gameData.year,
        description: gameData.description,
        franchise: gameData.franchise
    })
}