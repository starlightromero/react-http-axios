import React, { Component } from 'react'
import axios from 'axios'
import classes from './FullPost.module.css'

class FullPost extends Component {
  state = {
    loadedPost: null
  }

  loadData = () => {
    const id = this.props.match.params.id
    if (id) {
      if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +id)) {        
        axios.get(`posts/${id}`).then(response => {
          this.setState({loadedPost: response.data})
        })
      }
    }
  }

  componentDidMount () {
    this.loadData()
  }

  componentDidUpdate () {
    console.log(this.props)
    this.loadData()
  }

  deletePostHandler = () => {
    const id = this.props.match.params.id
    axios.delete(`posts/${id}`).then(response => {
      console.log(response)
    })
  }

  render () {
    const id = this.props.match.params.id
    const { loadedPost } = this.state
    let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>
    if (id) {
      post = <p style={{textAlign: 'center'}}>Loading...</p>
    }
    if (loadedPost) {
      post = (
        <div className={classes.FullPost}>
          <h1>{loadedPost.title}</h1>
          <p>{loadedPost.body}</p>
          <div className={classes.Edit}>
            <button onClick={this.deletePostHandler} className={classes.Delete}>
              Delete
            </button>
          </div>
        </div>

      )
    }
    return post
  }
}

export default FullPost
