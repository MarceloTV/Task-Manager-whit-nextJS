import React,{ Component } from 'react'
import Button from '@material-ui/core/Button'

import styles from '../styles/Components/Form.module.css'

class Form extends Component{
    render(){
        return <form className={`w-50 p-3 card ${styles.form}`} onSubmit={this.props.handle}>
            <h2 className="mb-2">{this.props.title}</h2>
            {this.props.inputs.map((v,i) => {
                return <div key={i} className="form-group">
                    <input {...v} className="form-control"/>
                </div>
            })}
            {this.props.error &&
                <p className="p-1 bg-danger text-center text-light">{this.props.message}</p>
            }
            <Button variant="outlined" type="submit" color="secondary">
                Send
            </Button>
        </form>
    }
}

export default Form