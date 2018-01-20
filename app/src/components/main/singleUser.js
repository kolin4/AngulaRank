import React from 'react';

class SingleUser extends React.Component {


    render(){
        return (
           <div className='col-1-4'>
                <div className='user' onClick={this.props.parseData}>
                    <img alt='userImg' src={this.props.userData.avatar_url} />
                    <div className='login'>
                        <h5>{this.props.userData.login}</h5>
                    </div>
                </div>
            </div>
        )
    }
}


export default SingleUser;