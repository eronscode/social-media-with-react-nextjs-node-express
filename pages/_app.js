import React from 'react'
import Layout from '../components/Layout/Layout';
import "semantic-ui-css/semantic.min.css"

function App({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
  }

export default App
