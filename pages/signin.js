import React,{ Component } from 'react'
import Layout from '../components/Layout'
import SignIn from '../views/SignIn'

class SignInPage extends Component{
    render(){
        return <Layout>
            <SignIn />
        </Layout>
    }
}

export default SignInPage