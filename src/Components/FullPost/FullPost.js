import React, { Component } from 'react'
import axios from 'axios'
import classes from './FullPost.module.css'

class FullPost extends Component {
  state = {
    loadedPost: null
  }

  comonentDidUpdate () {
    if (this.props.id) {
      if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {        
        axios.get(`https://jsonplaceholder.typicode.com/posts/${this.props.id}`).then(response => {
          this.setState({loadedPost: response.data})
        })
      }
    }
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
          <div className='Edit'>
            <button className='Delete'>Delete</button>
          </div>
        </div>

      )
    }
    return post
  }
}

export default FullPost
