import React, { Component } from 'react';
import './Weather.css';
import fetchJsonp from 'fetch-jsonp'
import $ from 'jquery';

class Weather extends Component{
    constructor(props){
        super(props);
        this.state={
            tabIndex:0,
            data:null,
            data1:null
        };
        this.getWeather=this.getWeather.bind(this);
    }
    getWeather(){
        var that=this;

        // $.get("http://t.weather.sojson.com/api/weather/city/101030100",res=>{
        //     console.log(res)
        // })

        // let requestConfig = {
        //     hearders:{
        //         // "Content-Type":"application/json"
        //     },
        //     mode: "cors",
        //     credentials:"include",
        //     method: "GET",
        //     dataType: "jsonp",
        //   }
        // fetchJsonp('http://t.weather.sojson.com/api/weather/city/101030100',requestConfig).then(res=>{
        //     console.log(res);
        //     that.setState({
        //         data:res
        //     })
        // });

        let requestConfig={
          method: "GET",
        }
        fetch('http://t.weather.sojson.com/api/weather/city/101210101',requestConfig).then(res=>res.json()).then(res=>{
            this.setState({
                data:res.data
            },()=>{console.log(this.state.data.wendu)});
        });
        fetch('http://t.weather.sojson.com/api/weather/city/101160101',requestConfig).then(res=>res.json()).then(res=>{
            this.setState({
                data1:res.data
            },()=>{console.log(this.state.data1.wendu)});
        });
    }
    componentWillMount(){
        this.getWeather();
    }
    render() {
        if(this.state.data&&this.state.data1)
            return (           
                <div>
                    <h2>风里雨里，我们一起</h2>
                    <form className='weather-box'>
                        <fieldset>
                            <legend>杭州</legend>
                            <p>
                                <span>温度：</span>
                                {this.state.data.wendu}
                                <span>度</span>
                            </p>
                            <p>
                                <span>湿度：</span>
                                {this.state.data.shidu}
                            </p>
                            <p>
                                <span>空气质量：</span>
                                {this.state.data.quality}
                            </p>
                            <p>
                                <span>建议：</span>
                                {this.state.data.ganmao}
                            </p>
                        </fieldset>
                    </form>
                    <form className='weather-box'>
                        <fieldset>
                            <legend>兰州</legend>
                            <p>
                                <span>温度：</span>
                                {this.state.data1.wendu}
                                <span>度</span>
                            </p>
                            <p>
                                <span>湿度：</span>
                                {this.state.data1.shidu}
                            </p>
                            <p>
                                <span>空气质量：</span>
                                {this.state.data1.quality}
                            </p>
                            <p>
                                <span>建议：</span>
                                {this.state.data1.ganmao}
                            </p>
                        </fieldset>                
                    </form>
                </div>
            )
        else 
            return <p>加载中...</p>

    }
}
export default Weather;