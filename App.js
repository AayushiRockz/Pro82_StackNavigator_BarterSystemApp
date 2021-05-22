
import React from 'react';
import {Component} from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native';
import AppHeader from './AppHeader'

export default class App extends React.Component {
 constructor(){
   super();
   this.state={
     text:'',
     isSearchPressed:false,
     word:'Loading...',
     lexicalCategory:'',
     definition:''
   
   }
 }
  getWord=(word)=>{
    var  searchKeyWord=word.toLowerCase()
    var url="https://rupinwhitehatjr.github.io/dictionary/"+searchKeyWord+".json"
    // console.log(url)
    return fetch(url)
    .then((data) =>{
      if(data.status===200){
        return data.json()
      }else{
        return null
      }
    })
    .then((response)=>{
      var responseObject = response

      if(responseObject){
        var wordData = responseObject.definitions[0]
        var definition = wordData.description
        var lexicalCategory=wordData.wordtype

        this.setState({
          "word":this.state.text,
          "definition":definition,
          "lexicalCategory": lexicalCategory
        })
      }else{
        this.setState({
          "word":this.state.text,
          "definition":"Not Found"
        })
      }
    })
  }
  render(){
    return (
      <View>
        <AppHeader/>
        <TextInput style={styles.inputBox} onChangeText={text=>{
          this.setState({
            text:text,
            isSearchPressed:false,
            word:'Loading...',
            lexicalCategory:'',
            examples:[],
            definition:''
          })
        }} 
        placeholder={"Type here..."}
          value={this.state.text}/>
  
        <TouchableOpacity style={styles.button} onPress={()=>{
          this.setState({isSearchPressed:true});
          this.getWord(this.state.text);
          
        }}>
          <Text style={styles.anyText}>Search</Text>
          </TouchableOpacity>

          <View>
            <Text>
              {this.state.isSearchPressed && this.state.word === "Loading..."
              ?this.state.word
              :''
              }
            </Text>
            {
              this.state.word!=="Loading..."?
              (
                <View style={{justifyContent:'center'}}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>word:{" "}</Text>
                    <Text style={{fontSize:18}}>{this.state.word}</Text>
                  </View>

                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>type:{" "}</Text>
                    <Text style={{fontSize:18}}>{this.state.lexicalCategory}</Text>
                  </View>

                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>definition:{" "}</Text>
                    <Text style={{fontSize:18}}>{this.state.definition}</Text>
                  </View>
                  
                </View>
              )
              :null
            }
          </View>
      </View>
    );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox:{
    width:200,
    height:50,
    backgroundColor:'pink',
    borderWidth:5,
    borderColor:'magenta',
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    marginTop:30,
    padding:10

    
  },
  button:{
    width:100,
    height:40,
    backgroundColor:"cyan",
    justifyContent:'center',
    borderColor:'blue',
    borderWidth:2.5,
    alignContent:'center',
    alignItems:'center',
    margin:20,
    alignSelf:'center'
  },
  anyText:{
    fontSize:22,
    fontWeight:'bold',
    color:'red'
  },
  detailsContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  detailsTitle:{
    fontSize:20,
    fontWeight:'bold',

  }

});
