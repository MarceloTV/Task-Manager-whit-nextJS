import React,{ Component } from 'react'
import Form from '../components/Form'
import router from 'next/router'

import Firebase from '../conf/firebase.conf'

class SignUp extends Component{

    state = {
        message: null,
        error: false
    }

    firebase = Firebase()

    handle = (e) => {
        e.preventDefault()
        if(e.currentTarget.password.value != e.currentTarget.re_password.value){
            this.setState({message: "The password aren't equals",error: true})
            return false
        }
        this.firebase.auth().createUserWithEmailAndPassword(e.currentTarget.email.value,e.currentTarget.password.value)
            .catch(error => {
                this.setState({message: error.message,error: true})
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
            <Form handle={this.handle} error={this.state.error} message={this.state.message} inputs={inputs} title={"Type your Data to SignUp"}/>
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
    },
    {
        placeholder: 'Re-enter your password',
        type: 'password',
        name: 're_password'
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


export default SignUp