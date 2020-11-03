import React, { Component } from 'react'
import axios from 'axios'
import classes from './FullPost.module.css'

class FullPost extends Component {
  state = {
    loadedPost: null
  }

  componentDidUpdate () {
    if (this.props.id) {
      if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {        
        axios.get(`posts/${this.props.id}`).then(response => {
          this.setState({loadedPost: response.data})
        })
      }
    }
  }

  deletePostHandler = () => {
    axios.delete(`posts/${this.props.id}`).then(response => {
      console.log(response)
    })
  }

  render () {
    const { loadedPost } = this.state
    let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>
    if (this.props.id) {
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
