import React from 'react';
import Spinner from '../spinner';
import axios from 'axios';
import Pagination from './pagination';
import octopage from 'github-pagination';

class RepositoryDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            isData: false,
            repoData:{},
            currentPage: 1,
            lastPage : 1,
            dataLoading : true
        }
    }
    componentWillMount(){
     
                 
        if (this.props.repoData.length === 0){
           let url = `https://api.github.com/repos/${this.props.match.match.params.id}/${this.props.match.match.params.name}`;

           axios.get(url)
            .then(response =>{
                 
                this.setState({
                    repoData:response.data,
                    dataLoading :false
                }, ()=>{
                    this.getContributors();
                })
            })
            .catch(error=>{
                console.log(error);
                
            })
      
           
        } else {
 
            
            let repoData =  this.props.repoData.repoData;
            
            this.setState({
                repoData,
                dataLoading:false
            }, ()=>{
                this.getContributors();
            })  
        }
    }
  
  getContributors = (event = undefined) =>{

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
          
    
           const url = `${this.state.repoData.contributors_url}?page=${currentPage}&per_page=10`;
           
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
                    
                })
    
        

    }
    close =()=>{
        this.props.match.history.goBack();   
    }
    render(){
        let repo = this.state.repoData;

        
        return (
            <div className='container'>
                <div className='row'>
                <div className='details-container'>
                <span onClick={this.close} className='close'></span>
                    {this.state.dataLoading ?  null : (
                          <div className='repoDetailsDescription'>
                                <div className='name'><strong>-- {repo.name} --</strong></div>
                                <div className='owner'>
                                    <div className='ownerImg'>
                                        <img src={repo.owner.avatar_url} alt='owner'/>
                                    </div>
                                    <div className='ownerName'>
                                        <h5>Owner: {repo.owner.login}</h5>
                                    </div>
                                </div>
                                <div className='description'>
                                    <div className='language'><strong>Language: </strong>{repo.language}</div>
                                    <div className='description-text'><strong> </strong>{repo.description}</div>
    
                                </div>
                           </div>

                    )}  
                    <div className='repoDetailsContributors'>
                        {!this.state.isData ? <Spinner /> : this.state.data.map( elem =>{
                            return (
                                <div key={elem.id} className='col-1-4'>
                                    <div className='user' >
                                    <img alt='userImg' src={elem.avatar_url}  />
                                    <div className='login'>
                                        <h5>{elem.login}</h5>
                                    </div>
                                    </div>
                                </div> 
                            )
                        }) }                                      
                          {!this.state.isData ? null : <Pagination currentPage={this.state.currentPage} lastPage={this.state.lastPage} getUserRepos={(event)=>this.getContributors(event)}/>}    
                    </div>
                   
                </div>
                </div>
            </div>
        )
    }
}


export default RepositoryDetails;