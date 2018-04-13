import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import Square from './square';
import './main.css'
class App extends Component{
    constructor(props){
        super(props)
        this.state ={
            cell:[],
            counter:0,
            squares:[]
        };
    }
    
    componentDidMount(){
        this.squares()
    }


    handleClick(e){
        const target = document.getElementById(e).classList;
        if(target.contains('dead')){
            target.remove('dead')
            target.add('alive')
        } else if( target.contains('alive')){
            target.remove('alive')
            target.add('dead')
        }

        const n = parseInt(e, 10);
        let tempArray = this.state.cell.slice();
        tempArray.push(n)
        this.setState({cell: tempArray})
    }
    
    handleStart(x){
        clearInterval(this.count)
        this.count = setInterval(()=>{
            const count = this.state.counter + 1;
            this.setState({counter: count})
            const cells = [...document.querySelectorAll('.square') ]
            cells.forEach(cell => {
                cell.classList.remove('new')
            });
            // cells.forEach(cell => {
            //     const parse = parseFloat(cell.id);
            //     const arr = [parse - 51, parse - 50, parse - 49, parse + 1, parse + 51, parse + 50, parse + 49, parse - 1]
            //     let neighbors = 0;
            //     arr.filter( n => {
            //         if(n <= 0){
            //             n += 1500
            //         }
            //         if(n > 1500){
            //             n -= 1500
            //         }
            //         const doc = document.getElementById(n);
            //         if( (doc.classList.contains('alive') && !doc.classList.contains('new') ) || ( doc.classList.contains('dead') && doc.classList.contains('new') ) ){ 
            //             neighbors += 1;
            //         }
            //     })
            //             // console.log(cell.id,neighbors)
            //         if(cell.classList.contains('dead') && neighbors === 3){
            //             this.updateCell(parseInt(cell.id, 10), 'add')
            //             cell.classList.remove('dead')
            //             cell.classList.add('alive','new')
            //         } else if(cell.classList.contains('alive') && neighbors < 2){
            //             this.updateCell(parseInt(cell.id, 10), 'remove')
            //             cell.classList.add('dead','new')
            //             cell.classList.remove('old', 'alive')
            //         } else if(cell.classList.contains('alive') && neighbors >= 2 && neighbors < 4){
            //             cell.classList.add('old')
            //         } else if(cell.classList.contains('alive') && neighbors > 3){
            //             this.updateCell(parseInt(cell.id, 10), 'remove')
            //             cell.classList.add('dead','new')                        
            //             cell.classList.remove('old', 'alive')
            //         }

            // })
            const changed = cells.filter( cell => {
                const parse = parseFloat(cell.id);
                const arr = [parse - 51, parse - 50, parse - 49, parse + 1, parse + 51, parse + 50, parse + 49, parse - 1]
                let neighbors = 0;
                arr.filter( n => {
                    if(n <= 0){
                        n += 1500
                    }
                    if(n > 1500){
                        n -= 1500
                    }
                    const doc = document.getElementById(n);
                    if(doc.classList.contains('alive')){
                       return neighbors += 1;
                    } else {
                        return neighbors
                    }
                })
                return neighbors > 0;
            })
            changed.forEach(cell => {
                const parse = parseFloat(cell.id);
                const arr = [parse - 51, parse - 50, parse - 49, parse + 1, parse + 51, parse + 50, parse + 49, parse - 1]
                let neighbors = 0;
                arr.filter( n => {
                    if(n <= 0){
                        n += 1500
                    }
                    if(n > 1500){
                        n -= 1500
                    }
                    const doc = document.getElementById(n);
                    if( (doc.classList.contains('alive') && !doc.classList.contains('new') ) || ( doc.classList.contains('dead') && doc.classList.contains('new') ) ){ 
                       return neighbors += 1;
                    } else {
                        return neighbors
                    }
                })
                        // console.log(cell.id,neighbors)
                    if(cell.classList.contains('dead') && neighbors === 3){
                        this.updateCell(parseInt(cell.id, 10), 'add')
                        cell.classList.remove('dead')
                        cell.classList.add('alive','new')
                    } else if(cell.classList.contains('alive') && neighbors < 2){
                        this.updateCell(parseInt(cell.id, 10), 'remove')
                        cell.classList.add('dead','new')
                        cell.classList.remove('old', 'alive')
                    } else if(cell.classList.contains('alive') && neighbors >= 2 && neighbors < 4){
                        cell.classList.add('old')
                    } else if(cell.classList.contains('alive') && neighbors > 3){
                        this.updateCell(parseInt(cell.id, 10), 'remove')
                        cell.classList.add('dead','new')                        
                        cell.classList.remove('old', 'alive')
                    }

            })
        }, 100)
    }
    updateCell(id, addRemove){
        if(addRemove === 'remove'){
            let tempArray = this.state.cell.slice();
            const newArr = tempArray.filter( n => n !== id)
            this.setState({cell: newArr})
        } else if (addRemove === 'add'){
            const newArr = this.state.cell;
            newArr.push(id)
            this.setState({cell:newArr})
        }
    }
    handlePause(x){
        clearInterval(this.count)
    }
    handleStop(){
        this.setState({cell:[]})
        const cells = [...document.querySelectorAll('.square') ]
            cells.forEach(cell => {
                cell.classList.remove('new', 'alive', 'old')
                cell.classList.add('dead')
        });
        clearInterval(this.count);
        this.setState({counter:0})
    }
    squares(){
        const squares = [];
        for (let i = 0; i < 1500; i++) {
          squares.push(<Square id={i+1} key={i+1} test={this.state.update} click={e => this.handleClick(e.target.id)}/>);
        }
        this.setState({ squares })
        return squares;
    }
    render(){
        return(
        <div>
        <div className="scoreboard">
            <div className="counter">
            {this.state.counter}
            </div>
        <button className='btn btn-primary' onClick={e => this.handleStart(this.state.counter)}>Start</button>
        <button className='btn btn-primary' onClick={e => this.handlePause()}>Pause</button>        
        <button className='btn btn-primary' onClick={e => this.handleStop()}>Stop</button>
        </div>
        <div className='container'>
        {this.state.squares}
        </div>
        </div>
            
        )
    }
}

ReactDOM.render(<App />, document.querySelector('.root'));



    