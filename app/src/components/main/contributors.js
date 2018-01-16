import React from 'react';
import axios from 'axios';

class Contributors extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            isData : false
        }

    }   
    componentDidMount(){
        axios.get('https://api.github.com/user',{         
                auth : {
                    username:'kolin4',
                    password: 'omadren1'
                }          
        })
        .then(response =>{
            console.log(response.config.headers.Authorization);
            let key = response.config.headers.Authorization;
            axios.defaults.headers.common['Authorization'] = key;
            this.xxx();
        })
    
    
            
    } 
    xxx = () =>{
        console.log('xxx');
        
        axios.get('https://api.github.com/orgs/angular')
            .then( response => {
                let numberOfRepos = response.data.public_repos;
                let pages = Math.ceil(numberOfRepos/100);
                const urlToRepos = [];    

                for (let i = 1; i <= pages; i++){
                    let url = `https://api.github.com/orgs/angular/repos?page=${i}&per_page=100`;
                    urlToRepos.push(url);
                }

                this.getAllRepos(urlToRepos);

            })
            .catch( error =>{
                console.log(error);
                
            })
    }

    getAllRepos= (url)=>{
        console.log('allRepos');
        
        const promiseArray = url.map ( url=>{
            return axios.get(url);
        } )

        axios.all(promiseArray)
            .then( ( response)=>{
                const allRepositories = [...response];
         
                const repositoriesUrl = [];
                
                for (let i = 0; i < allRepositories.length; i++ ){
                   
                    for (let j = 0; j < allRepositories[i].data.length; j++){
                        
                        repositoriesUrl.push( allRepositories[i].data[j].contributors_url)
                    }
                }
                this.getPagesOfContributors(repositoriesUrl);
                
                
                
            })
            .catch( error =>{
                console.log(error);
                
            })
    }

    getPagesOfContributors = (url)=>{
        console.log('getPages');
        
        const contributors = [...this.state.data];
        const manyPages = [];
        
        const promiseArray = url.map( url=>{
            return (
                axios.get(`${url}?per_page=100`)
            )
        })

        
        
        axios.all(promiseArray)
            .then( response => {
            
                console.log('pushing contr');
                
                // pushing contributors

                for ( let i = 0; i < response.length; i++){
                   let singleRepo =  response[i].data;
                   
                   
                   if (response[i].data.length === 100){
                       
                       
                       let pageNr= response[i].headers.link.split('>')[1];
                   
                       let item = {
                           url : response[i].config.url,
                           pages : pageNr[pageNr.length-1]
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
                
                this.setState({
                    data:contributors
                } )

                if ( this.state.data.length !== 0 ){

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
                
                  this.getAllContributors(urlToDownload)
                  
               }
            })
            .catch( error => {
                console.log(error);
                
            })
    }
   
    getAllContributors = (url) =>{
        const promiseArray = url.map(url=>{
            return axios.get(url)
        })
        const contributors = [...this.state.data];

        
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
                
                this.setState({
                    data:contributors,
                    isData:true
                } )
                console.log(this.state);
                
        })
        .catch( error =>{
            console.log(error);
            
        })
    }    
    render(){
    
       
        return (
            <h5>hello</h5>
        )
    }
}



export default Contributors;