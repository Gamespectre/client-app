import React from 'react'
import { Router } from 'react-router'
import BrowserHistory from 'react-router/lib/BrowserHistory'
import routes from './routes'
const history = new BrowserHistory()

const dest = document.getElementById('app')
const element = (<Router history={ history } children={routes}/>)
React.render(element, dest)

if (process.env.NODE_ENV !== 'production') {
  window.React = React // enable debugger
  const reactRoot = window.document.getElementById('app')

  if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.')
  }
}
