import React, {Component} from 'react'
import classes from './NewPost.module.css'
import axios from 'axios'

class NewPost extends Component {
  state = {
    title: '',
    content: '',
    author: 'Max'
  }

  postDataHandler = () => {
    const { title, body, author } = this.state
    axios.post('posts', {
      title,
      body,
      author
    }).then(response => {
      console.log(response)
      this.props.history.replace('/posts')
    })
  }

  render() {
    return (
      <div className={classes.NewPost}>
        <h1>Add a Post</h1>
        <label>Title</label>
        <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})}/>
        <label>Content</label>
        <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})}/>
        <label>Author</label>
        <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
          <option value="Max">Max</option>
          <option value="Manu">Manu</option>
        </select>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    )
  }
}

export default NewPost;