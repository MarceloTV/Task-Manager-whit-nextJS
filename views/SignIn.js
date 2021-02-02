import React,{ Component } from 'react'
import Form from '../components/Form'
import router from 'next/router'

import Firebase from '../conf/firebase.conf'

class SignIn extends Component{

    state = {
        error: false,
        message: null
    }

    firebase = Firebase()

    handle = (e) => {
        e.preventDefault()
        this.firebase.auth().signInWithEmailAndPassword(e.currentTarget.email.value,e.currentTarget.password.value)
            .catch(err => {
                this.setState({error:true,message: err.message})
            })
    }

    componentWillUnmount(){
        this.firebase = null
    }

    render(){
        this.firebase.auth().onAuthStateChanged(user => {
            if(user){
                router.push('/')
            }
        })

        return <main style={styles.main}>
            <Form handle={this.handle} message={this.state.message} error={this.state.error} inputs={inputs} title={"Type tour Data to SignIn"}/>
        </main>
    }
}

const inputs = [
    {
        placeholder: 'Type your email',
        type: 'email',
        name: 'email'
    },
    {
        placeholder: 'Type your password',
        type: 'password',
        name: 'password'
    }
]

const styles = {
    main: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}


export default SignIn