import React, { Component } from 'react'
import axios from '../../axios'

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
    axios.get('posts').then(response => {
      const posts = response.data.slice(0, 4)
      const updatedPosts = posts.map(post => {
        return {...post, author: 'Starlight'}
      })
      this.setState({posts: updatedPosts})
    }).catch(error => {
      this.setState({error: true})
    }) 
  }

  postSelectedHandler = id => {
    this.setState({selectedPostId: id})
  }

  render () {
    let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
    if (!this.state.error) {      
      posts = this.state.posts.map(post => {
        return <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)} />
      })
    }
    
    return (
      <div className={classes.Blog}>
        <header>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/new-post">New Post</a></li>
            </ul>
          </nav>
        </header>
        <section className={classes.Posts}>
          {posts}
        </section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    )
  }
}

export default Blog
