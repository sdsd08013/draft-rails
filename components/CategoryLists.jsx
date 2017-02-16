import React from 'react';
import ReactDOM from 'react-dom';
class CategoryLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: this.props.categories
    };
  }

  render() {
    return (
      <div>
        <CategoryForm />
        <table>
          <tbody>
            {this.state.categories.map(function(value,index){
              var url = value['id'] + "/articles"
              return (
                <tr key={index} className="tr-category-row">
                  <td key={index} className="td-category-row">
                    <i key={index} className="glyphicon glyphicon-folder-close"> <a key={index} href={url}>{value['name']}</a></i>
                  </td>
                  <CategoryDelete id={value['id']}/>
                  <CategoryEdit id={value['id']}/>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  }
};

class CategoryDelete extends React.Component {
  constructor(props) {
    super(props);
    this.deleteCategory = this. _deleteCategory.bind(this);
  }

  _deleteCategory() {
    $.ajax({
      url: "/admin/categories/" + this.props.id,
      dataType: 'json',
      type: 'DELETE',
      success: function(data) {
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    });
  }

  render() {
    return (
      <td className="td-category-row" width="10px">
        <form className="category-form-delete" onSubmit={this.deleteCategory}>
          <input name="utf8" type="hidden" value="✓"/>
          <input name="category[id]" type="hidden" value={this.props.id}/>
          <input className="category-button" type="submit" value="削除" onClick={this.clickEvent} />
        </form>
      </td>
    )
  }
};

class CategoryEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <td className="td-category-row" width="10px">
        <form className="category-form-edit" onSubmit={this.createCategory}>
          <input name="utf8" type="hidden" value="✓"/>
          <input className="category-button" type="submit" value="編集" onClick={this.clickEvent} />
        </form>
      </td>
    );
  }
};


class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: "",
    };
    this.changeText = this. _changeText.bind(this);
    this.createCategory = this. _createCategory.bind(this);
  }

  _changeText(e) {
    this.setState({formValue: e.target.value});
  }

  _createCategory() {
    $.ajax({
      url: "/admin/categories",
      dataType: 'json',
      type: 'POST',
      data: {"category[name]" : this.state.formValue},
      success: function(data) {
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    });
  }

  render() {
    return (
      <form className="category-form-add" onSubmit={this.createCategory}>
        <input name="utf8" type="hidden" value="✓"/>
        <input name="category[name]" type="text" onChange={this.changeText}/>
        <input className="category-button" type="submit" value="追加" />
      </form>
    );
  }
};
window.CategoryLists = CategoryLists;
