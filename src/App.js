import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import img1 from './img/1.png';
import img2 from './img/2.png';
import img3 from './img/3.png';
import img4 from './img/4.png';
import img5 from './img/5.png';
import tree_img from './img/tree.jpg';
import Weather from './Weather/Weather.js';

class App extends Component {
  constructor(props){
    super(props);
    let imgs=[];
    let weddingDate=Date.parse("Jun 23, 2018");
    weddingDate+=11*3600000;
    let today=new Date();
    today=today.getTime();
    let passed=today-weddingDate;
    let day=parseInt(passed/(3600000*24));
    let hour=parseInt(passed/3600000-day*24);
    let minute=parseInt(passed/60000-day*24*60-hour*60);
    let second=parseInt(passed/1000-day*24*3600-hour*3600-minute*60);
    this.state={
      imgs:[img1,img2,img3,img4,img5],
      time:{
        day:day,
        hour:hour,
        minute:minute,
        second:second
      }
    };
    this.changeImg=this.changeImg.bind(this);
    this.Pause=this.Pause.bind(this);
    this.CoupledTime=this.CoupledTime.bind(this);
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
    
    this.refs.movemain.className="movemain";
    this.refs.moveright.className="moveright";
    this.refs.moveleft.className="moveleft";
    this.refs.movemain1.className="movemain1";
    this.refs.moveright1.className="moveright1";
    this.refs.moveleft1.className="moveleft1";
    setTimeout(()=>{
        this.refs.movemain.className="awaymain";
        this.refs.moveright.className="awayright";
        this.refs.moveleft.className="awayleft";
        this.refs.movemain1.className="awaymain1";
        this.refs.moveright1.className="awayright1";
        this.refs.moveleft1.className="awayleft1";
      },1000)
    
      let imgs1=[].concat(this.state.imgs);
    imgs1=this.changeSequence(imgs1);
    this.setState({
      imgs:imgs1,
    },()=>{
      
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

  CoupledTime(){
    let weddingDate=Date.parse("Jun 23, 2018");
    weddingDate+=11*3600000;
    let today=new Date();
    today=today.getTime();
    let passed=today-weddingDate;
    let day=parseInt(passed/(3600000*24));
    let hour=parseInt(passed/3600000-day*24);
    let minute=parseInt(passed/60000-day*24*60-hour*60);
    let second=parseInt(passed/1000-day*24*3600-hour*3600-minute*60);
    this.setState({
      time:{
        day:day,
        hour:hour,
        minute:minute,
        second:second
      }
    });
  }

  componentDidMount(){
    setTimeout(() => {
      this.refs.movemain.className="movemain";
    this.refs.moveright.className="moveright";
    this.refs.moveleft.className="moveleft";
    this.refs.movemain1.className="movemain1";
    this.refs.moveright1.className="moveright1";
    this.refs.moveleft1.className="moveleft1";
    setTimeout(()=>{
        this.refs.movemain.className="awaymain";
        this.refs.moveright.className="awayright";
        this.refs.moveleft.className="awayleft";
        this.refs.movemain1.className="awaymain1";
        this.refs.moveright1.className="awayright1";
        this.refs.moveleft1.className="awayleft1";
      },1000)
    
    this.t=setInterval(()=>{this.changeImg,3000});
    }, 3000);
    setInterval(()=>{this.CoupledTime,1000});  
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
                <img ref="moveleft" src={this.state.imgs[0]} />
                <img  ref='moveleft1' src={this.state.imgs[1]} />
              </div>
              <div className="slide-img-main">
                <img ref='movemain' onMouseEnter={()=>this.Pause()} onMouseLeave={()=>this.Continue()} src={this.state.imgs[1]} />
                <img className="img1" ref='movemain1' onMouseEnter={()=>this.Pause()} onMouseLeave={()=>this.Continue()} src={this.state.imgs[2]} />
              </div>
              <div className="slide-img-right">
                <img ref="moveright" src={this.state.imgs[2]} />
                <img ref="moveright1" src={this.state.imgs[3]} />
              </div>
            </div>
          </div>
          <div className="article">
            <div className="article-left">
              <div className="couple-time">
                <h2 className="couple-time-title">我们已经成婚：</h2>
                <div className="couple-time-box">
                  <p className="couple-time-number">{this.state.time.day}</p>
                  <p className="couple-time-text">天</p>
                  <p className="couple-time-number">{this.state.time.hour}</p>
                  <p className="couple-time-text">小时</p>
                  <p className="couple-time-number">{this.state.time.minute}</p>
                  <p className="couple-time-text">分钟</p>
                  <p className="couple-time-number">{this.state.time.second}</p>
                  <p className="couple-time-text">秒</p>
                </div>
              </div>
              {/* <div className="couple-tree">
                <img className="tree-img" src={tree_img} />
              </div> */}
            </div>
            <div className="article-center">
              <div className="poems">
                <div className="poem">
                  <h2>浣溪沙</h2>
                  <p>雲影斜開旭日紅，小閣花面漸交融。沈香宛轉心字重。<br/>
                  此夕風露巧相遇，他年鸞鳳共摶空。人間何處不從容。</p>
                </div>
                <hr/>
                <div className="poem">
                  <h2>贺新郎</h2>
                  <p>梦觉风雷定。看半轮、徐徐稳上，慢盈萧岭。欲搴帘栊流光湿，远近橘灯掩映。渐华彩、飘摇入影。蜜烛偷滴化喜泪，看双鸳、皓翎初相并。前尘誓，般般应。<br/>
                  千秋此际俱一静。怜眉山、似笑还颦，绿波红杏。执手西湖数层碧，误了梅邀鹤请。正晚照、楼船小艇。北望乡园何时到，愿乘槎、换朝夕醉醒。归期至，闻鸡鸣。</p>
                </div>
                <hr/>
              </div>
            </div>
            <div className="article-right">
              <Weather></Weather>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
