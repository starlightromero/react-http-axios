import React, { Component } from 'react'
import axios from 'axios'

import Post from '../../Components/Post/Post'
import FullPost from '../../Components/FullPost/FullPost'
import NewPost from '../../Components/NewPost/NewPost'
import classes from './Blog.module.css'

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null
  }
  
  componentDidMount () {
    axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
      const posts = response.data.slice(0, 4)
      const updatedPosts = posts.map(post => {
        return {...post, author: 'Starlight'}
      })
      this.setState({posts: updatedPosts})
    })
  }

  postSelectedHandler = id => {
    this.setState({selectedPostid: id})
  }

  render () {
    const posts = this.state.posts.map(post => {
      return <Post
        key={post.id}
        title={post.title}
        author={post.author}
        clicked={() => this.postSelectedHandler(post.id)} />
    })
    
    return (<div>
      <section className={classes.Blog}>
        {posts}
      </section>
      <section>
        <FullPost id={this.state.selectedPostId} />
      </section>
      <section>
        <NewPost />
      </section>
    </div>)
  }
}

export default Blog
