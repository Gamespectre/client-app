import React from 'react'
import AdminFlow from '../../../app/admin/AdminFlow'
import AdminActions from '../../../actions/admin/AdminActions'

class AdminList extends React.Component {

    constructor() {
        super()
        this.flow = new AdminFlow()
    }

    saveSelected(e) {
        e.preventDefault()
        this.flow.save(this.state.selected, this.props.package, {
            error: this.error.bind(this),
            success: this.done.bind(this)
        })
    }

    done(data) {
        AdminActions.clear()

        this.setState({
            success: true,
            message: data.message
        })
    }

    error(data) {
        this.setState({
            success: false,
            message: data.message
        })
    }
}

export default AdminList