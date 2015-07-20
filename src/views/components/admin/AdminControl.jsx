import React from 'react'
import AdminFlow from '../../../app/admin/AdminFlow'

class AdminControl extends React.Component {

    constructor() {
        super()

        this.flow = new AdminFlow()

        this.state = {
            success: true,
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

    receiveError(data) {
        this.setState({
            success: false,
            message: data.message
        })
    }

    render() {

        return (
            <div>Please implement the render!</div>
        )
    }
}

export default AdminControl