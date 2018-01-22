import React from 'react';

class Pagination extends React.Component{

    render(){
        return (
            <div className='pagination'>
                  <div className='left' onClick={this.props.getUserRepos} data-id='prev'>{`<`}</div>
                  <span>{this.props.currentPage} / {this.props.lastPage}</span>
                  <div className='right' onClick={this.props.getUserRepos}  data-id='next'>{`>`}</div>
            </div>
        )
    }
}


export default Pagination;