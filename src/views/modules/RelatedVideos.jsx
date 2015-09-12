import React from 'react'
import ApiClient from '../../api/ApiClient'
import { reactiveComponent } from 'mobservable-react'
import { resolve } from 'react-resolver'
import PagedList from '../../decorators/PagedList'

@PagedList
@reactiveComponent
@resolve('videos', (props) => {
    if(props.shouldFetch()) return ApiClient.fetch('videos', props.parentType, props.relatedTo, {
        page: props.page,
        perPage: 10
    }).then(props.receiveMeta).then(props.receiveData)
})
@reactiveComponent
class RelatedVideos extends React.Component {

    render() {

        return (
            <div>
                <h2>Videos</h2>
                <button onClick={this.props.nextAction}>Next</button>
                {this.props.listData.map(item => (<div key={item.id}>
                    <h2>{item.title || item.name}</h2>
                </div>))}
            </div>
        )
    }
}

export default RelatedVideos