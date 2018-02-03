import React from 'react';
import axios from 'axios';
import Spinner from '../spinner';
import {connect} from 'react-redux';
import SingleUser from './singleUser';
import {Link} from 'react-router-dom';
import Wraper from '../wraper';
import Sort from './sort';
import octopage from 'github-pagination';


class Contributors extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            isData : false,
            users:[],
            number:1,
            currentPage :1,
            lastPage : 0
             
        }

    }   
    componentDidMount(){
      
        let key = localStorage.getItem('auth');
     
        axios.defaults.headers.common['Authorization'] = key;
        let contributors = localStorage.getItem('contributors');

        // using local data if exist
        if (contributors === null) {         
             this.getAllData(1,'https://api.github.com/orgs/angular/repos',this.getPagesOfContributors);
        } else {
            this.setState({
                data: JSON.parse(contributors),
                isData:true,
                lastPage: Math.ceil(JSON.parse(contributors).length/100)
            })
        }
      
    } 
 
 
    getAllData = (pageNr,url,callback = undefined,allData = [])=>{

        
        let urlAdress = `${url}?page=${pageNr}&per_page=100`;
        let data = allData;

        
        axios.get(urlAdress)
            .then(response =>{
     
                if (response.data.length > 0){
                    data.push(...response.data);
                    
                    if (response.headers.link !== undefined){
                       
                        let page = octopage.parser(response.headers.link);
                    
                        if (page.next === undefined){                 
                            
                            if (callback !== undefined){
                 
                                
                                callback(data)
                            }
                            
                        } else {         
                                    
                            this.getAllData(Number(page.next),url,callback,data);
                        }
                    } else {         
                                    
                        if (callback !== undefined){
                            callback(data)
                        }
                    }
                    
                }
               
            })
            .catch( error =>{
                console.log(error);
                this.props.error();
                
            })
    }

 
    getPagesOfContributors = (data)=>{
     
        
        const urlData = []
        for(let i =0; i<data.length; i++){
            urlData.push(data[i].contributors_url);
        }


        const contributors = [...this.state.data];
        const manyPages = [];
        
        const promiseArray = urlData.map( url=>{
            return (
                axios.get(`${url}?page=1&per_page=100`)
            )
        })
     
        axios.all(promiseArray)
            .then( response => {
            
          // pushing contributors

                for ( let i = 0; i < response.length; i++){
                   let singleRepo =  response[i].data;
                   
                   
                   if ((response[i].data.length === 100) && (response[i].headers.link !== undefined)){
                       // zmien na octopage
             
                        let pageNr = octopage.parser(response[i].headers.link);
                   
                   
                       let item = {
                           url : response[i].config.url,
                           pages : pageNr.last
                       }
                
                       
                        
                       manyPages.push(item)
                   }

                   for ( let i = 0; i < singleRepo.length; i++ ){
                       let singleUser = singleRepo[i];
                       let userExist = false;


                       if (contributors.length > 0) {
                            for ( let i = 0; i < contributors.length; i++) {
                    
                                if (contributors[i].id === singleUser.id){
                                  userExist = true
                                }                    
                            }
                       } 
                       
                       if (!userExist) {
                        contributors.push(singleUser);
                    }    
                   }
                   
                }
     
                    const urlToDownload = [];
               
                    for (let i = 0 ; i < manyPages.length; i++){
                        const urlFromSingleElem = [];
            
                        function createUrl(url,pages){
                              for (let i = 2; i <= pages; i++ ){
                                  let urlFinal = `${url}&page=${i}`;
                                  
                                  urlFromSingleElem.push(urlFinal)
                              }  
                        }

                        createUrl(manyPages[i].url, manyPages[i].pages)
                        urlToDownload.push(...urlFromSingleElem)
                  }
                 
                  
                  
                  this.getAllContributors(urlToDownload,contributors)

            })
            .catch( error => {
                console.log(error);
                this.props.error();
            })
    }
   
    getAllContributors = (url,data) =>{
        
        
        const promiseArray = url.map(url=>{
            return axios.get(url)
        })
        const contributors = data;

        
        axios.all(promiseArray)
            .then( response => {

                for ( let i = 0; i < response.length; i++){
                   let singleRepo =  response[i].data;

                   for ( let i = 0; i < singleRepo.length; i++ ){
                       let singleUser = singleRepo[i];
                       let userExist = false;


                       if (contributors.length > 0) {
                            for ( let i = 0; i < contributors.length; i++) {
                    
                                if (contributors[i].id === singleUser.id){
                                  userExist = true
                                }                    
                            }
                       } 
                       
                       if (!userExist) {
                        contributors.push(singleUser);
                    }    
                   }
                   
                }   
                 // cut data for better performance. If you want to take all users  remove slice method
               this.getNumberOfFollowersAndGist(contributors.slice(0,1000));
                
        })
        .catch( error =>{
            console.log(error);
            this.props.error();
        })
    }    

    //  i need to fetch all users with other url, because in previous data user object contain only nr of contributions, this causes
    // about 2.6k more requests and take a lot of time. Suggest to give up idea with sorting :)
    getNumberOfFollowersAndGist = (data)=>{
        
        let contributors = data;
       
        
        
        let promiseArray = data.map( (elem)=>{
            let userUrl = elem.url;

            return axios.get(userUrl) 
        })
          
        axios.all(promiseArray)
            .then( response => {
                          
            for (let i = 0; i < contributors.length; i++){
                let user = contributors[i];
                let followersNr = response[i].data.followers;
                let gistNr = response[i].data.public_gists;
                let publicReposNr = response[i].data.public_repos;
                let following = response[i].data.following;
                let location = response[i].data.location;
                let name = response[i].data.name;
                let hireable =response[i].data.hireable;

                user.followers = followersNr;
                user.public_gists = gistNr;
                user.public_repos = publicReposNr;
                user.following = following;
                user.location = location;
                user.name = name;
                user.hireable =hireable;
            }    
                
            localStorage.setItem('contributors',JSON.stringify(contributors));
            this.setState({
                data: contributors,
                isData : true,
                lastPage: Math.ceil(contributors.length/100)
            })
            })
            .catch( error => {
                console.log(error);
                this.props.error();
                
            })
        
       
    }
    sort = (event)=>{
      
        let type;
        if (event.target.dataset.id === 'select'){            
            type = event.target.value;
        } else {           
            type = event.target.dataset.id;
        }
        const data = [...this.state.data];        
        
        switch (type){
                case 'Contributions':          
                data.sort( (a,b)=>{
                    return b.contributions - a.contributions
                })
                break;
            case 'Followers':
                data.sort( (a,b)=>{
                    return b.followers - a.followers
                })
                break;
            case 'Public repos':
                data.sort( (a,b)=>{
                    return b.public_repos - a.public_repos
                })
                break;
            case 'Gists' :
                data.sort( (a,b)=>{
                    return b.public_gists - a.public_gists
                })
                break;
            default :
            break;
        }
        localStorage.setItem('contributors',JSON.stringify(data));
        this.setState({
            data
        })
        
        
    
    }
    changeSite =(event)=>{
       
        switch(event.target.dataset.id){
            case  'prev' : 
                if (this.state.currentPage === 1){
                    return
                } else {
                    this.setState({
                        currentPage: this.state.currentPage - 1
                    })
                }
                break;
            case 'next' :
                if (this.state.currentPage === this.state.lastPage){
                    return;
                } else {
                    this.setState({
                        currentPage: this.state.currentPage +1
                    })
                } 
                break;
            default : 
                break;      
        }
        
    }
    render(){
        let dataToShow;
            if (this.state.currentPage === 1){
                dataToShow = 0;
            } else {
                dataToShow = this.state.currentPage +100;
            }
           let data = this.state.isData ? this.state.data.slice(dataToShow, dataToShow +100).map( (elem,index) => {
                return (
                    <Link to={`/contributors/${elem.login}`} key={elem.id} >
                        <SingleUser parseData={()=> this.props.parseUserData(elem)} userData={elem}/>
                    </Link>

                )
            }) : null;
        
   
        return (
            <Wraper>
                <div className='container'>
                {this.state.isData ? null : <Spinner />  }
               
                <div className='row'>
                {this.state.isData ? <Sort sort={this.sort} /> :null}
                  {data}
                <div className='pagination'>
                  <div className='left' onClick={this.changeSite} data-id='prev'>{`<`}</div>
                  <span>{this.state.currentPage} / {this.state.lastPage}</span>
                <div className='right' onClick={this.changeSite}  data-id='next'>{`>`}</div>
                </div>
                </div> 
                </div>
                
            </Wraper>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logIn : ()=> dispatch({type:'logIn'}),
        parseUserData : (elem) => dispatch({type:'UserData', elem:elem}),
        error: ()=> dispatch({type:'showError'})
    }
}

export default connect(null,mapDispatchToProps)(Contributors);
