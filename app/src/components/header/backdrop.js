import React from 'react';


class Backdrop extends React.Component {
    render(){
        return (
            this.props.menuShowed ? <div className='backdrop' onClick={this.props.show}
            ></div> : null

        )
    }
}


export default Backdrop;
