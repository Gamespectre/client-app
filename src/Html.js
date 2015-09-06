import React, {Component, PropTypes} from 'react';
import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
    static propTypes = {
        assets: PropTypes.object,
        component: PropTypes.object,
        store: PropTypes.object
    }

    render() {
        const {assets, component, resolverData} = this.props;
        return (
            <html lang="en-us">
            <head>
                <meta charSet="utf-8"/>
                {DocumentMeta.rewind({asReact: true})}

                <link rel="shortcut icon" href="/favicon.ico" />
                <link href={'http://fonts.googleapis.com/css?family=Rajdhani:300,400,700|Roboto:500,300,700,400'}
                      media="screen, projection" rel="stylesheet" type="text/css" />

                <link href={'https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css'}
                      media="screen, projection" rel="stylesheet" type="text/css" />

                {/* styles (will be present only in production with webpack extract text plugin) */}
                {Object.keys(assets.styles).map((style, i) =>
                    <link href={assets.styles[style]} key={i} media="screen, projection"
                          rel="stylesheet" type="text/css"/>
                )}
            </head>
            <body>
            <div id="app" dangerouslySetInnerHTML={{__html: React.renderToString(component)}}/>
            <script dangerouslySetInnerHTML={{__html: `window.__REACT_RESOLVER_PAYLOAD__=${serialize(resolverData)};`}} />
            <script src={assets.javascript.main}/>
            </body>
            </html>
        );
    }
}