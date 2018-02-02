import React from 'react';
import {connect} from 'react-redux';

class Error extends React.Component {
    closeErr = ()=>{
    
        
    }
    render(){
        return (
            <div className='error'> 
                <div className='errorMsg'>ERROR   CONNECTION</div>
                <span onClick={this.props.closeError} className='close'></span>
            
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        closeError : ()=> dispatch({type:'closeError'})
    }
}

export default connect(null,mapDispatchToProps)(Error);