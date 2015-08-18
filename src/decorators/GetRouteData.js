import React from 'react'
import ApiClient from '../api/ApiClient'
import mobservable from 'mobservable'
import Model from '../data/utils/Model'

export default (param, dataObject, searchCollection) => {
    return Component => {
        return mobservable.reactiveComponent(class extends React.Component {
            constructor(props) {
                super()

                var cachedData = null
                let query = props.router.getCurrentParams()[param]
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
                        let data = response.data.data
                        let itemProcessor = dataObject.processor

                        if(data instanceof Array === false) {
                            if(dataObject.data instanceof Array === false) {
                                dataObject.data = itemProcessor(data)
                            }
                            else {
                                dataObject.data.push(itemProcessor(data))
                            }
                        }
                        else if(dataObject.data instanceof Array === false) {

                            dataObject.data = data.map(dataItem => itemProcessor(dataItem))
                        }
                        else {
                            data.forEach(item => dataObject.data.push(itemProcessor(item)))
                        }
                    })
                }
            }

            render() {
                return <Component />
            }
        })
    }
}