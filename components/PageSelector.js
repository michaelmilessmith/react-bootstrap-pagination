import React from 'react';

export default class PageSelector extends React.Component {
  getListItems() {
     if (this.props.total <= this.props.pageCount)
     {
         return [];
     }
     else if(this.props.total <= this.props.pageCount * 2)
     {
         return [1,2];
     }
     else if(this.props.total <= this.props.pageCount * 3)
     {
         return [1,2,3];
     }
     else if(this.props.total <= this.props.pageCount * 4)
     {
     return [1,2,3,4];
     }
     else if (this.props.total <= this.props.pageCount * 5 || this.props.number <= 3)
     {
         return [1,2,3,4,5];
     }
     const lastPage = Math.ceil(this.props.total / this.props.pageCount);
     const i = this.props.number;
     if (i > lastPage - 2){
         return [lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
     }
     return [i - 2, i - 1, i, i + 1, i + 2];
  },
  handlePageNumberChange(e, number){
     e.preventDefault();
     this.props.onPageNumberChange(number);
  },
  isActive(number){
     return number == this.props.number ? "active" : "";
  },
  getPrevious(pagesCount){
     if (pagesCount > 1) {
         if(this.props.number == 1)
         {
             return (<li className="disabled"><a href="#" >«</a></li>) ;
         }
         else
         {
             return (<li><a href="#" onClick={(e)=>this.handlePageNumberChange(e, this.props.number - 1)}>«</a></li>) ;
         }
     }
  },
  getNext(pagesCount){
     if (pagesCount > 1) {
         if(this.props.total <= (this.props.number * this.props.pageCount))
         {
             return (<li className="disabled"><a href="#" >»</a></li>) ;
         }
         else
         {
             return (<li><a href="#" onClick={(e)=>this.handlePageNumberChange(e, this.props.number + 1)}>»</a></li>) ;
         }
     }
  },
  getLast(){
     const lastPage = Math.ceil(this.props.total / this.props.pageCount);
     if (lastPage > 5 && this.props.number < lastPage - 2) {
         return (<li><a href="#" onClick={(e)=>this.handlePageNumberChange(e, lastPage)}>Last</a></li>) ;
     }
  },
  getFirst(){
     const lastPage = Math.ceil(this.props.total / this.props.pageCount);
     if (lastPage > 5 && this.props.number > 3) {
         return (<li><a href="#" onClick={(e)=>this.handlePageNumberChange(e, 1)}>First</a></li>) ;
     }
  },
  render()) {
     const pages = this.getListItems();
     return (
          <ul className="pagination pagination-sm btn-group">
             {this.getFirst(pages.length)}
             {this.getPrevious(pages.length)}
             {this.getListItems().map(i => <li className={this.isActive(i)}><a href="#" onClick={(e)=>this.handlePageNumberChange(e, i)}>{i}</a></li>)}
             {this.getNext(pages.length)}
             {this.getLast(pages.length)}
         </ul>
     );
 }
}
