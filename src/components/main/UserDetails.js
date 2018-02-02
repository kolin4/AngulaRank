import React from 'react';
import Spinner from '../spinner';
import axios from 'axios';
import octopage from 'github-pagination';
import Repository from './repository';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Pagination from './pagination';

class UserDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data :[],
            isData:false,
            userData:{},
            currentPage : 1,
            lastPage : 0
        }
    }
    componentWillMount(){
   

        let id = this.props.match.match.params.id;
        
        if (this.props.userData.name === undefined){

            axios.get(`https://api.github.com/users/${id}`)
                .then( response => {
                 
                    let user = response.data;
                    this.setState({
                        userData: user
                    }, ()=>{
                        this.getUserRepos();
                    })
                })
                .catch( error =>{
                    console.log(error);
                    
                })
            
        } else {
            let user = this.props.userData;
       
            
            this.setState({
                userData: user
            }, ()=>{
                this.getUserRepos();
            })  
        }
    }

    closePage = ()=>{
        this.props.match.history.push('/contributors');
    }
   
    getUserRepos = (event = undefined) =>{
          
 
        let currentPage = this.state.currentPage;
        let lastPage = this.state.lastPage;

       if (event !== undefined){
       
         switch (event.target.dataset.id){
             case 'prev' :
                if (currentPage === 1 ){
                    return
                } else {
                    currentPage -= 1;
                    this.setState({
                        isData:false
                    })
                }
            
                break;
             case 'next' :
                if (currentPage === lastPage){
                    return
                } else {
                    currentPage += 1;
                    this.setState({
                        isData:false
                    })
                }
               
                break;
            default :
            break;      
         }
       } 
      

       const url = `${this.state.userData.repos_url}?page=${currentPage}&per_page=10`;

        axios.get(url)
            .then( response =>{
             
                
                if ( response.headers.link === undefined){
                    this.setState({
                        isData:true,
                        data: response.data,
                        lastPage : currentPage
                    })
                    
                } else {
                    let linkHeaders = octopage.parser(response.headers.link);

                    let lastPage = linkHeaders.last;
                    if (lastPage === undefined){
                        lastPage = currentPage;
                    }
                    this.setState({
                        data: response.data,
                        isData:true,
                        currentPage,
                        lastPage

                    })
                }
            
            })
            .catch(error =>{
                console.log(error);
                this.props.error()
                
            })

    }
    
    render(){
   
        let user = this.state.userData

        let userMatchUrl = this.props.match.match.url;
        
        // fix differents beetwen user url adress
        if (userMatchUrl[userMatchUrl.length -1] !== '/'){
           
           let userUpdate = userMatchUrl.split('');
           userUpdate.push('/');
           userMatchUrl = userUpdate.join('');
       
        }
    
        
        let data = this.state.isData ? this.state.data.map( elem=>{
                return (
                    <Link to={`${userMatchUrl}${elem.name}`} key={elem.id} >
                        <Repository parseRepositoryData={()=> this.props.parseRepositoryData(elem)} data={elem}/>
                    </Link>
                )
            }) : null;   

        return (
            <div className='container'>
                <div className='row'>
                
                   <div className='details-container'>
                        <span onClick={this.closePage} className='close'></span>
                        <div className='user-info'>
                            <div className='userAvatar'>
                                <img src={user.avatar_url} alt='user'  />
                            </div>  
                            
                            <div className='userDetails'>
                                <div className='userLogin'>
                                    {user.login}
                                </div>    
                                <hr />
                                <div className='details'>
                                    <p><strong>Name:</strong>{user.name}</p>
                                    <p><strong>Location:</strong>{user.location}</p>
                                    <p><strong>Followers:</strong>{user.followers}</p>
                                    <p><strong>Public repos:</strong>{user.public_repos}</p>
                                    <p><strong>Public gists:</strong>{user.public_gists}</p>
                                    <p><strong>Contributions:</strong>{user.contributions}</p>
                                </div>
                            </div>
                            <hr/>                            
                        </div>
                       
                        <div className='repositories'>
                        <h5>Repositories:</h5>
                            {this.state.isData ? data : <Spinner/>}
                            {!this.state.isData ? null : <Pagination currentPage={this.state.currentPage} lastPage={this.state.lastPage} getUserRepos={(event)=>this.getUserRepos(event)}/>}    
                        </div>
                       
                   
                   </div>            
                </div>
            </div>    
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        parseRepositoryData : (repoData)=> dispatch({type:'parseRepositoryData', repoData:{repoData}}),
        error: ()=> dispatch({type:'showError'})
    }
}


export default connect(null,mapDispatchToProps)(UserDetails);