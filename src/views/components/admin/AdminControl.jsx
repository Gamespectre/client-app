import React from 'react'

class AdminControl extends React.Component {

    constructor() {
        super()

        this.state = {
            message: "",
            query: ""
        }
    }

    changeHandler(event) {
        let query = event.target.value

        this.setState({
            query: query
        })
    }

    render() {

        return (
            <div>Please implement the render!</div>
        )
    }
}

export default AdminControl