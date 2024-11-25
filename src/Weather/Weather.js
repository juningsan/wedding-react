import React, { Component } from 'react';
import './Weather.css';
import fetchJsonp from 'fetch-jsonp'
import $ from 'jquery';

class Weather extends Component{
    constructor(props){
        super(props);
        this.state={
            tabIndex:0,
            data:{
                weather:null,
                air:null
            },
            data1:{
                weather:null,
                air:null
            }
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
        // fetch('http://t.weather.sojson.com/api/weather/city/101210101',requestConfig).then(res=>res.json()).then(res=>{
        //     this.setState({
        //         data:res.data
        //     },()=>{console.log(this.state.data.wendu)});
        // });
        // fetch('http://t.weather.sojson.com/api/weather/city/101160101',requestConfig).then(res=>res.json()).then(res=>{
        //     this.setState({
        //         data1:res.data
        //     },()=>{console.log(this.state.data1.wendu)});
        // });
        fetch('https://free-api.heweather.com/s6/weather/now?location=CN101210101&&key=3a3d9439e95a4472b1aaf7106b0e1aad',requestConfig).then(res=>res.json()).then(res=>{
            // this.setState({
            //     data:{
            //         weather:res.HeWeather6[0].now
            //     }
            // },()=>{console.log(this.state.data)});
            let weather=res.HeWeather6[0].now;
            fetch('https://free-api.heweather.com/s6/air/now?location=CN101210101&&key=3a3d9439e95a4472b1aaf7106b0e1aad',requestConfig).then(res=>res.json()).then(res=>{
            this.setState({
                data:{
                    weather:weather,
                    air:res.HeWeather6[0].air_now_city
                }
            },()=>{console.log(this.state.data)});
            });
        });
        fetch('https://free-api.heweather.com/s6/weather/now?location=CN101160101&&key=3a3d9439e95a4472b1aaf7106b0e1aad',requestConfig).then(res=>res.json()).then(res=>{
            let weather=res.HeWeather6[0].now;
            fetch('https://free-api.heweather.com/s6/air/now?location=CN101210101&&key=3a3d9439e95a4472b1aaf7106b0e1aad',requestConfig).then(res=>res.json()).then(res=>{
            this.setState({
                data1:{
                    weather:weather,
                    air:res.HeWeather6[0].air_now_city
                }
            },()=>{console.log(this.state.data1)})
            });
        });
    }
    componentWillMount(){
        this.getWeather();
    }
    render() {
        if(this.state.data&&this.state.data.weather&&this.state.data.air&&this.state.data1&&this.state.data1.weather&&this.state.data1.air)
            return (           
                <div>
                    <h2>风里雨里，我们一起</h2>
                    <form className='weather-box'>
                        <fieldset>
                            <legend>杭州</legend>
                            <p>
                                <span>天气：</span>
                                {this.state.data.weather.cond_txt}
                            </p>
                            <p>
                                <span>温度：</span>
                                {this.state.data.weather.tmp}
                                <span>度</span>
                            </p>
                            <p>
                                <span>相对湿度：</span>
                                {this.state.data.weather.hum}
                            </p>
                            <p>
                                <span>空气质量：</span>
                                {this.state.data.air.qlty}
                            </p>
                            {/* <p>
                                <span>建议：</span>
                                {this.state.data.ganmao}
                            </p> */}
                        </fieldset>
                    </form>
                    <form className='weather-box'>
                        <fieldset>
                            <legend>兰州</legend>
                            <p>
                                <span>天气：</span>
                                {this.state.data1.weather.cond_txt}
                            </p>
                            <p>
                                <span>温度：</span>
                                {this.state.data1.weather.tmp}
                                <span>度</span>
                            </p>
                            <p>
                                <span>相对湿度：</span>
                                {this.state.data1.weather.hum}
                            </p>
                            <p>
                                <span>空气质量：</span>
                                {this.state.data1.air.qlty}
                            </p>
                            {/* <p>
                                <span>建议：</span>
                                {this.state.data1.ganmao}
                            </p> */}
                        </fieldset>                
                    </form>
                </div>
            )
        else 
            return <p>加载中...</p>

    }
}
export default Weather;