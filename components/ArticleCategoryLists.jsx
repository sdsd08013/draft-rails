import React from 'react';
import ReactDOM from 'react-dom';
class ArticleCategoryLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: this.props.categories
    };
  }

  pushMessage(comment){
    this.getCategories();
  }

  getCategories() {
    $.ajax({
      url: "/admin/get_categories",
      dataType: 'json',
      type: 'GET',
      success: function(categories) {
        this.setState({categories: categories})
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    });
  }

  render() {
    return (
      <div>
        <ArticleCategoryForm onEventCallBack={this.pushMessage} />
        <ul className="articles article-category-lists">
          {this.state.categories.map(function(value, index){
            return <ArticleCategory categoryName={value['name']} categoryId={value['id']} listIndex={index} />;
          })}
        </ul>
      </div>
    )
  }
};

class ArticleCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  clickEvent(){
    if (this.state.clicked == false) {
      this.setState({clicked:true})
    } else {
      this.setState({clicked:false})
    }
  }

  render() {
    if (this.state.clicked == true) {
      var listClass = "listClass-clicked"
      var listName = "category[id][" + this.props.listIndex + "]"
      var hiddenForm = <input key={this.props.listIndex} name={listName} type="hidden" value={this.props.categoryId}/>;
    } else {
      var listClass = "listClass-unclicked"
      var hiddenForm = false
    };
    return (
      <li key={this.props.listIndex} className={listClass} onClick={this.clickEvent}>
        <i className="glyphicon glyphicon-folder-close"> {this.props.categoryName}</i>
        {hiddenForm}
      </li>
    )
}};

class ArticleCategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: ""
    };
  }

  changeText(e) {
    this.setState({formValue: e.target.value});
  }

  createCategory() {
    $.ajax({
      url: "/admin/categories",
      dataType: 'json',
      type: 'POST',
      data: { "category[name]" : this.state.formValue},
      success: function(data) {
        this.props.onEventCallBack(true);
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    });
  }

  render() {
    return (
      <div>
        <input className="article-category-form" name="category[name]" type="text" onChange={this.changeText}/>
        <div className="article-category-button" onClick={this.createCategory}><i className="glyphicon glyphicon-plus"></i></div>
      </div>
    );
  }
};

window.ArticleCategoryLists = ArticleCategoryLists;
