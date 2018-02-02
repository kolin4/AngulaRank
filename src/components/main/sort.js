import React from 'react';
import Wraper from '../wraper';

class Sort extends React.Component {
    render(){
        return (
            <Wraper >    
                <div className='sort'>
                    <span>Sort by:</span>
                    <div className='sort-container'>
                        <div onClick={this.props.sort} data-id='Contributions' className='sort-option'>Contributions
                            <div data-id='Contributions' className='arrow-sort'></div>
                        </div>
                        <div onClick={this.props.sort}  data-id='Followers' className='sort-option'>Followers
                            <div  data-id='Followers' className='arrow-sort'></div>
                        </div>
                        <div onClick={this.props.sort} data-id='Public repos' className='sort-option'>Public repos
                            <div data-id='Public repos' className='arrow-sort'></div>
                        </div>
                        <div onClick={this.props.sort} data-id='Gists' className='sort-option'>Gists
                            <div data-id='Gists' className='arrow-sort'></div>
                        </div>
                    </div>
                
                </div>
                <div className='sort-mobile'>
                    <span>Sort by:</span>
                    <select onChange={this.props.sort} data-id='select'>
                        <option  >Contributions</option>
                        <option  >Followers</option>
                        <option  >Public repos</option>
                        <option  >Gists</option>
                    </select>
                
                </div>
            </Wraper>    
        )
    }
}


export default Sort;