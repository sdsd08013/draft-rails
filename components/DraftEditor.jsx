import React from 'react';
import ReactDOM from 'react-dom';
import { Editor } from 'react-draft-wysiwyg';
import {EditorState} from 'draft-js';


class DraftEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onEditorStateChange = (editorState) => this.setState({editorState});
    this.uploadImage = this.uploadImage.bind(this);
  }
  uploadImage(file) {
    var formdata = new FormData();
    formdata.append('file', file);
    return $.ajax({
      url           : "/admin/images",
      dataType      : 'json',
      type          : 'POST',
      data          : formdata,
      contentType   : false,
      processData   : false,
      success: function(image) {
        resolve({ data: { link: image.url}});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err)
      }.bind(this)
    });

  }
  uploadCallback(file) {
    this.uploadImage(file).bind(this)
    return new Promise(
      (resolve, reject) => {
        var formdata = new FormData();
        formdata.append('file', file);
        $.ajax({
          url           : "/admin/images",
          dataType      : 'json',
          type          : 'POST',
          data          : formdata,
          contentType   : false,
          processData   : false,
          success: function(image) {
            resolve({ data: { link: image.url}});
          }.bind(this),
          error: function(xhr, status, err) {
            console.log(err)
          }.bind(this)
        });
      }
    );
  }
  render() {
    const { editorState } = this.state;
    return (<Editor
      editorState={editorState}
      onEditorStateChange={this.onEditorStateChange}
      toolbar={{ image: { uploadCallback: this.uploadCallback }}}
    />)
  }
}
window.DraftEditor = DraftEditor
