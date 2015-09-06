import React from 'react'
import ApiClient from '../../api/ApiClient'
import { reactiveComponent } from 'mobservable-react'
import { resolve } from 'react-resolver'
import PagedList from '../../decorators/PagedList'

@PagedList
@resolve('videos', (props) => {
    if(props.shouldFetch()) return ApiClient.fetch('videos', props.parentType, props.relatedTo, {
        page: props.page,
        perPage: 10
    }).then(props.receiveMeta).then(props.receiveData)
})
class RelatedVideos extends React.Component {

    render() {
        console.log()

        return (
            <div>
                {this.props.listData.map(item => (<div key={item.id}>
                    <h2>{item.title || item.name}</h2>
                </div>))}
            </div>
        )
    }
}

export default RelatedVideos