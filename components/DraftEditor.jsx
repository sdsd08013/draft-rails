import React from 'react';
import ReactDOM from 'react-dom';
import { Editor } from 'react-draft-wysiwyg';
import {EditorState} from 'draft-js';


class DraftEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onEditorStateChange = (editorState) => this.setState({editorState});
  }
  render() {
    const { editorState } = this.state;
    return (<Editor
      editorState={editorState}
      onEditorStateChange={this.onEditorStateChange}
    />)
  }
}
window.DraftEditor = DraftEditor
