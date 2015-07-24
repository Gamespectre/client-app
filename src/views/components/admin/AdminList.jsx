import React from 'react'
import AdminFlow from '../../../app/admin/AdminFlow'
import AdminActions from '../../../actions/admin/AdminActions'

class AdminList extends React.Component {

    constructor() {
        super()
        this.flow = new AdminFlow()
    }

    done(data) {
        AdminActions.clear()

        this.setState({
            success: true,
            message: "Everything is saved!"
        })
    }

    error(data) {
        this.setState({
            success: false,
            message: data.error
        })
    }
}

export default AdminList