import React,{Component} from 'react';


export default class Square extends Component {
    // checkNeighbor(x){
    //     const id = x;
    //     const arr = [id-51,id-50,id-49,id+1,id+51,id+50,id+49,id-1]
    //     let neighbors = 0;
    //     const filter = arr.filter( n => {
    //         if(document.getElementById(n).classList.contains('alive')){
    //             neighbors += 1;
    //         }
    //     })
    //     if(neighbors > 3){
    //         return( 
    //         <div className="square alive" id={id} onClick={this.props.click}>
    //         </div>
    //         )
    //     } else {
    //         return (
    //         <div className="square" id={id} onClick={this.props.click}>
    //         </div>    
    //         )
    //     }
    // }
    // shouldComponentUpdate(nextProps, nextState){
    //     console.log(nextProps.test)
        
    // }
    render(){
        return (
        <div className="square dead" id={this.props.id} onClick={this.props.click}>
        </div>  
        )
    }
}