import React from 'react'
import Layout from './Layout'

const Loader = () => {
  return (
    <Layout>
            
            <div className="d-flex flex-column justify-content-center align-items-center" style={{height: '70vh'}}>
                <h3>Loading...</h3>
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
            


        </Layout>
  )
}

export default Loader