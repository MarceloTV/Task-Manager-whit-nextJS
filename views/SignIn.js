import React,{ Component } from 'react'
import Form from '../components/Form'
import router from 'next/router'

import Firebase from '../conf/firebase.conf'

class SignIn extends Component{

    firebase = Firebase()

    handle = (e) => {
        e.preventDefault()
        this.firebase.auth().signInWithEmailAndPassword(e.currentTarget.email.value,e.currentTarget.password.value)
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
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
            <Form handle={this.handle} inputs={inputs} title={"Type tour Data to SignIn"}/>
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