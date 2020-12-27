import React , {Component} from 'react'
import Head from 'next/head'

//The Header Component for each page
import Header from './Header'

class Layout extends Component{
    render(){
        return <div className="w-100" style={styles}>

            {/* The Head */}
            <Head>
                <title>Task Manager</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>

            {/* The Header */}
            <Header />

            {/* The Children */}
            {this.props.children}
        </div>
    }
}

//Styles to the Layout Container
const styles = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
}

export default Layout