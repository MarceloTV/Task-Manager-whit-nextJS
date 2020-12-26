import React,{ Component } from 'react'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'

import Firebase from '../conf/firebase.conf'

class Tasks extends Component{

    state = {
        tasks: [],
        open: false
    }

    firebase = Firebase().firestore()

    checkTasks = null

    deleteTask = async (id) => {
        try{
            const taskAction = await this.firebase.collection("tasks").doc(id).delete()
            console.log("ok")
            this.getTask(this.props.user)
        }catch(error){
            console.log(error)
        }
    }

    addTask = (e) => {
        e.preventDefault()
        const [task_name,task_time,task_date] = [
            e.currentTarget.task_name.value,
            e.currentTarget.task_time.value,
            e.currentTarget.task_date.value
        ]

        const time = {
            hours: new Date().getHours(),
            minutes: new Date().getMinutes(),
            seconds : new Date().getSeconds(),
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            day: new Date().getDate()
        }

        if(new Date() > new Date(`${time.month}-${time.day}-${time.year} ${time.hours}:${time.minutes}:${time.seconds}`)){
            alert("Type the correct date and time")
            return false
        }
        
        console.log(task_name,task_date,task_time)
        this.firebase.collection("tasks").add({
            task_name,
            task_time,
            task_date,
            user: this.props.user
        }).then(data => {
            console.log('ok',data)
            this.getTask(this.props.user)
        }).catch(data => {
            console.log('error',data)
        })
    }

    getTask = async (user) => {
       try{
        const data = await this.firebase.collection("tasks").where("user","==",user).get()
        let tasks = []
        data.forEach(v => {
            tasks.push({...v.data(),id: v.id})
            console.log(v.data())
        })
        console.log(tasks)
        this.setState({open: false,tasks})
       }catch(error){
           console.log(error)
       }
    }

    componentDidMount(){
        this.getTask(this.props.user)
        
    }

    componentDidUpdate(){
        if(Notification.permission != "default" && this.state.tasks != 0){
            this.checkTasks = setInterval(() => {
                this.state.tasks.forEach(v => {
                    const time = {
                        hours: new Date().getHours(),
                        minutes: new Date().getMinutes(),
                        seconds : new Date().getSeconds(),
                        year: new Date().getFullYear(),
                        month: new Date().getMonth() + 1,
                        day: new Date().getDate()
                    }
                })
            },1000)
        }
    }

    render(){
        return <div className="w-50">

            <Dialog open={this.state.open} aria-labelledby="simple-dialog-title">
                <DialogTitle id="simple-dialog-title">Add Task</DialogTitle>

                <DialogContent>
                    <DialogContentText>Type your new task data</DialogContentText>
                    <form onSubmit={this.addTask}>
                        <TextField 
                            margin="dense"
                            name="task_name"
                            type="text"
                            label="Task name"
                            fullWidth
                        />

                        <TextField 
                            margin="dense"
                            name="task_time"
                            type="time"
                            fullWidth
                        />

                        <TextField 
                            margin="dense"
                            name="task_date"
                            type="date"
                            fullWidth
                        />
                        <div className="mt-2 w-50 d-flex justify-content-around">
                            <Button variant="contained" color="secondary" type="button" onClick={() => this.setState({...this.state,open: false})} >
                                Cancel
                            </Button>

                            <Button variant="contained" color="primary" type="submit">
                                Save
                            </Button>
                        </div>
                    </form>

                    
                </DialogContent>
            </Dialog>

            <div className="d-flex w-100 justify-content-between align-items-center">
                <h1>Tasks' Table</h1>
                <Button variant='contained' onClick={() => this.setState({...this.state,open: true})}>
                    ➕
                </Button>
            </div>

            <TableContainer component={Paper} style={{height: 400,overflowX: 'auto'}}>
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}}>Task Name</TableCell>
                            <TableCell style={{fontWeight: 'bold'}}>Task Time</TableCell>
                            <TableCell style={{fontWeight: 'bold'}}>Task Date</TableCell>
                            <TableCell style={{fontWeight: 'bold'}}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.state.tasks.map((v,i) => <TableRow key={i}>

                                <TableCell>{v.task_name}</TableCell>
                                <TableCell>{v.task_time}</TableCell>
                                <TableCell>{v.task_date.split("-").reverse().join("-")}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => this.deleteTask(v.id)}>
                                        Complete
                                    </Button>
                                </TableCell>

                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div> 
        
    }
}

export default Tasks