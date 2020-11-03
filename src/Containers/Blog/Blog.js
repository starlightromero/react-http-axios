import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import classes from './Blog.module.css'
import Posts from './Posts/Posts'
import NewPost from './NewPost/NewPost'
import FullPost from './FullPost/FullPost'

class Blog extends Component {
  render () {
    return (
      <div className={classes.Blog}>
        <header>
          <nav>
            <ul>
              <li><NavLink to='/' exact>Home</NavLink></li>
              <li><NavLink to='/new-post' exact>New Post</NavLink></li>
            </ul>
          </nav>
        </header>
        <Route path='/' exact component={Posts} />
        <Route path='/new-post' exact component={NewPost} />
        <Route path='/:id' exact component={FullPost} />
      </div>
    )
  }
}

export default Blog
