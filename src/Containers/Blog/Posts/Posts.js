import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import classes from './Posts.module.css'
import axios from '../../../axios'
import Post from '../../../Components/Post/Post'
import FullPost from '../FullPost/FullPost'

class Posts extends Component {
  state = {
    posts: []
  }

  componentDidMount () {
    axios.get('posts').then(response => {
      const posts = response.data.slice(0, 4)
      const updatedPosts = posts.map(post => {
        return {...post, author: 'Starlight'}
      })
      this.setState({posts: updatedPosts})
    }).catch(error => {
      console.log(error)
    })
  }

  postSelectedHandler = id => {
    this.props.history.push(`/post/${id}`)
  }
  
  render () {
    let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
    if (!this.state.error) {      
      posts = this.state.posts.map(post => {
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        )
      })
    }
    
    return (
      <>
        <section className={classes.Posts}>
          {posts}
        </section>
        <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
      </>
    )
  }
}

export default Posts
