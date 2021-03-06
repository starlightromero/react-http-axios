import React, { Component, Suspense } from 'react'
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'
import classes from './Blog.module.css'
import Posts from './Posts/Posts'

const NewPost = React.lazy(() => import('./NewPost/NewPost'))

class Blog extends Component {
  render () {
    return (
      <div className={classes.Blog}>
        <header>
          <nav>
            <ul>
              <li><NavLink to='/posts/' exact>Posts</NavLink></li>
              <li><NavLink to='/new-post'>New Post</NavLink></li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path='/new-post' render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <NewPost />
              </Suspense>
            )}
          />
          <Route path='/posts' component={Posts} />
          <Redirect from='/' to='/posts' />
        </Switch>
      </div>
    )
  }
}

export default Blog
