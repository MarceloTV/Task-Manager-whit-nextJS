import React , {Component} from 'react'
import Head from 'next/head'
import Header from './Header'

class Layout extends Component{
    render(){
        return <div className="w-100" style={styles}>
            <Head>
                <title>Task Manager</title>
            </Head>
            <Header />
            {this.props.children}
        </div>
    }
}

const styles = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
}

export default Layout