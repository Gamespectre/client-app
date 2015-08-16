import React from 'react'
import { reactiveComponent } from 'mobservable'
import ListService from '../app/ListService'
import { debounce } from 'lodash'
import verge from 'verge'

export default (dataObject, props) => {
    const list = new ListService(dataObject)

    const process = property => data => {
        if(dataObject.hasOwnProperty(property)) {
            data.forEach(item => dataObject[property].push(props[property](item)))
        }
        else console.error("Supplied data object has no property " + property)
    }

    const doFetch = () => {
        for(let property in props) {
            let fetchPromise = list.fetch()
            if(fetchPromise instanceof Promise) fetchPromise.then(process(property))
        }
    }

    return (Component) => {
        return reactiveComponent(class extends React.Component {
            constructor() {
                super()

                if(__CLIENT__) {
                    window.addEventListener('scroll', this.checkScroll())
                }

                doFetch()
            }

            componentWillUnmount() {
                window.removeEventListener('scroll', this.checkScroll())
            }

            checkScroll() {
                let prevScroll = 0

                return debounce(() => {
                    let top = verge.scrollY()
                    let down = top > prevScroll ? true : false
                    prevScroll = top

                    if(down) {
                        dataObject.page++
                        doFetch()
                    }
                }, 250)
            }

            render() {
                return <Component />
            }
        })
    }
}