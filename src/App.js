import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import img1 from '../img/1.png';
import img2 from '../img/2.png';
import img3 from '../img/3.png';
import img4 from '../img/4.png';
import img5 from '../img/5.png';
// import img6 from '../img/6.jpg';
// import img7 from '../img/7.jpg';
// import img8 from '../img/8.jpg';
// import img9 from '../img/9.jpg';
// import img10 from '../img/10.jpg';
// import img11 from '../img/11.jpg';
// console.log(this);
class App extends Component {

  constructor(props){
    super(props);
    let imgs=[];
    // for(let i=0;i<11;i++){
    //     imgs[i]=window["img"+(i+1)];
        
    // }
    this.state={
      imgs:[img1,img2,img3,img4,img5],
    };
    this.changeImg=this.changeImg.bind(this);
    this.Pause=this.Pause.bind(this);
  }


  changeSequence(arr){
    let arr1=[];
    let temp =arr[0];
    for(let i=0;i<arr.length-1;i++){
      arr1[i]=arr[i+1];
    }
    arr1[arr.length-1]=temp;
    return arr1;
  }
  changeImg(){
    let imgs1=[].concat(this.state.imgs);
    imgs1=this.changeSequence(imgs1);
    console.log('ok',imgs1)
    this.setState({
      imgs:imgs1,
    })
    
  }

  Pause(){
    console.log('paused')
    clearInterval(this.t);
  }

  Continue(){
    console.log('continued');
    this.t=setInterval(this.changeImg,3000);
  }
  componentDidMount(){
    this.t=setInterval(this.changeImg,3000);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title">燕尔之约</h1>
        </header>
        <div className="content">
          <div className="slide">
              <div className="slide-bar">
              <div className="slide-img-left">
              <img src={this.state.imgs[0]} />
              </div>
              <div className="slide-img-main">
                <img onMouseEnter={()=>this.Pause()} onMouseLeave={()=>this.Continue()} src={this.state.imgs[1]} />
              </div>
              <div className="slide-img-right">
              <img src={this.state.imgs[2]} />
              </div>
            </div>
          </div>
          <div className="article">
            <div className="article-left">
            </div>
            <div className="article-center">
            </div>
            <div className="article-right">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
