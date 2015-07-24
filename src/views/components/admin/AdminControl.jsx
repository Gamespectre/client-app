import React from 'react'
import AdminFlow from '../../../app/admin/AdminFlow'

class AdminControl extends React.Component {

    constructor() {
        super()

        this.flow = new AdminFlow()
    }

    receiveError(data) {
        this.setState({
            success: false,
            message: data.error
        })
    }

    render() {

        return (
            <div>Please implement the render!</div>
        )
    }
}

export default AdminControl