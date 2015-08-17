import React from 'react'
import ApiClient from '../api/ApiClient'
import { reactiveComponent } from 'mobservable'

export default (param, dataObject, searchCollection) => {
    return Component => {
        return reactiveComponent(class extends React.Component {
            constructor(props) {
                super()
                let query = props.router.getCurrentParams()[param]
                var cachedData = null

                for(let search in searchCollection) {
                    cachedData = searchCollection[search].find((item) => {
                        return item[search] === query
                    })
                }

                if(cachedData !== null) {
                    dataObject.data = cachedData
                }
                else {
                    ApiClient.fetch(dataObject.method, dataObject.name, query).then(response => {
                        dataObject.insert(response.data.data)
                    })
                }
            }

            render() {
                return <Component />
            }
        })
    }
}