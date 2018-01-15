import React from 'react';
import imgUrl from '../../images/angular-logo.png';

class Logo extends React.Component {
    render(){
        return (
            <div className={this.props.class}>
                 <div className='logoImg'>
                    <img src={imgUrl} alt='logo'/>
                 </div>
            </div>
        )
    }
}

export default Logo;
