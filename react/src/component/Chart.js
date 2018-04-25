import React, {Component} from 'react';
import {Pie, Bar, Line} from 'react-chartjs-2';
import '../index.css'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export class SysChart extends Component {
  constructor(props){
    super(props);
    this.state= {
      System:'',
      Release:'',
      Architecture:'',
      Hostname:''
    };
  }
  componentDidMount(){
    const url = 'http://cse.xited.io:8000/api/sys';
    fetch(url)
    .then(res => res.json())
    .then(
      (result) =>{
        this.setState({
          System:result.system,
          Release:result.release,
          Architecture:result.architecture,
          Hostname:result.hostname
        });
      },
      (error) =>{

        })
    }
  render(){
    if(this.state.Error){
      return <h1>Error!</h1>;
    }
    return(
      <div className="info_font">
      <fieldset>
        <legend>System Information</legend>
        <p><b>System</b>: {this.state.System}</p>
        <p><b>Release</b>: {this.state.Release}</p>
        <p><b>Architecture</b>: {this.state.Architecture}</p>
        <p><b>Hostname</b>: {this.state.Hostname}</p>
        <CPUCountChart />
      </fieldset>
      </div>
    );
  }
}

export class CPUPercentChart extends Component {
  constructor(props){
    super(props);
    this.state= {
      a:0,
      b:100
    };
  }
  componentDidMount(){
    this.timerID = setInterval(
      () => this.getCPUPercentData(),
      5000
    );
  }
  getCPUPercentData(){
    const url = 'http://cse.xited.io:8000/api/cpu_percent';
    fetch(url)
    .then(res => res.json())
    .then(
      (result) =>{
        this.setState({
          a:result.cpu_percent,
          b:100-result.cpu_percent
        })
      },
      (error) =>{

        })
  }
  render(){
    return(
      <fieldset>
        <legend>CPU Percent Chart</legend>
        <Pie
        data = {{
          labels: [
            'Used',
            'Free',
          ],
          datasets: [{
            data: [this.state.a, this.state.b],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            ]
          }]
        }}
         />
      </fieldset>
    );
  }
}
export class CPUCountChart extends Component{
  constructor(props){
    super(props);
    this.state= {
      CPUCountPysical:0,
      CPUCountLogical:0
    };
  }
  componentDidMount(){
    const url = 'http://cse.xited.io:8000/api/cpu_count';
    fetch(url)
    .then(res => res.json())
    .then(
      (result) =>{
        this.setState({
          CPUCountPysical:result.cpu_count_pysical,
          CPUCountLogical:result.cpu_count_logical
        })
      },
      (error) =>{

        })
  }
  render(){
    if(this.state.Error){
      return <h1>Error!</h1>;
    }
    return(
      <div>
        <p><b>Pysical CPU</b>: {this.state.CPUCountPysical}</p>
        <p><b>Logical CPU</b>: {this.state.CPUCountLogical}</p>
      </div>
    );
  }
}
export class CPUTimesChart extends Component{
  constructor(props){
    super(props);
    this.state= {
      user:0,
      system:0,
      idle:0
    };
  }
  componentDidMount(){
    this.timerID = setInterval(
      () => this.getCPUTimesData(),
      5000
    );
  }
  getCPUTimesData(){
    const url = 'http://cse.xited.io:8000/api/cpu_times';
    fetch(url)
    .then(res => res.json())
    .then(
      (result) =>{
        this.setState({
          user:result.user,
          system:result.system,
          idle:result.idle
        })
      },
      (error) =>{

        })
  }
  render(){
    return(
      <fieldset>
        <legend>CPU Times table</legend>
        <div className="info_font">
          <p><b>User Time</b>: {this.state.user}</p>
          <p><b>System Time</b>: {this.state.system}</p>
          <p><b>Idle</b>: {this.state.idle}</p>
        </div>
      </fieldset>
    );
  }
}
export class NetSpeedChart extends Component{
  constructor(props){
    super(props);
    this.state={
      sendSpeed: [0,0,0,0,0,0,0,0,0,0],
      receiveSpeed: [0,0,0,0,0,0,0,0,0,0]
    };
  }
  componentDidMount(){
    this.timerID = setInterval(
      () => this.getNetSpeedData(),
      1000
    );
  }
  getNetSpeedData(){
    const url = 'http://cse.xited.io:8000/api/net_speed';
    fetch(url)
    .then(res => res.json())
    .then(
      (result) =>{
        this.setState((prevState) => ({
          sendSpeed:prevState.sendSpeed.slice(1,9).concat(result.send_speed),
          receiveSpeed:prevState.receiveSpeed.slice(1,9).concat(result.receive_speed)
        }));
      },
      (error) =>{

        })
  }
  render(){
    return(
      <fieldset>
      <legend>Net Speed Chart</legend>
      <Line
         data={{
           labels:['','','','','','','','',''],
           datasets:[{
             label:'send speed',
             data:this.state.sendSpeed,
             backgroundColor:'rgba(255,99,132,0.5)',
             borderColor:'rgba(255,99,132,0.5)',
             fill:false
           },
           {
             label:'receive speed',
             data:this.state.receiveSpeed,
             backgroundColor:'rgba(255,255,0,0.5)',
             borderColor:'rgba(255,255,0,0.5)',
             fill:false
           }
         ]
         }}
         options={{
           scales:{
             yAxes:[{
               ticks: {
                 beginATZero:true
               },
               scaleLabel:{
                 display:true,
                 labelString:'KB/s'
               }
             }]
           }
         }}
      />
      </fieldset>
    );
  }
}
export class MemUsageChart extends Component{
  constructor(props){
    super(props);
    this.state={
      used:[0,0,0,0,0,0,0,0,0,0],
      free:[0,0,0,0,0,0,0,0,0,0],
      buffers:[0,0,0,0,0,0,0,0,0,0],
      cached:[0,0,0,0,0,0,0,0,0,0]
    };
  }
  componentDidMount(){
    this.TimerID= setInterval(
      () => this.getMemUsageData(),
      1000
    );
  }
  getMemUsageData(){
    const url='http://cse.xited.io:8000/api/mem_usage';
    fetch(url)
    .then(res =>res.json())
    .then(
      (result) =>{
        this.setState(
          (prevState) => ({
            used:prevState.used.slice(1,9).concat(result.virtual.used/1048576),
            free:prevState.free.slice(1,9).concat(result.virtual.free/1048576),
            buffers:prevState.buffers.slice(1,9).concat(result.virtual.buffers/1048576),
            cached:prevState.cached.slice(1,9).concat(result.virtual.cached/1048576),
          })
        );
      }
    )
  }
  render(){
    return(
      <fieldset>
      <legend>Memory Usage Chart</legend>
      <Line
        data={{
          labels:['','','','','','','','',''],
          datasets:[{
            label:'Used Virtual Memory',
            data:this.state.used,
            backgroundColor:'rgba(153,255,204,0.5)',
            borderColor:'rgba(153,255,204,0.5)',
            fill:false
          },
          {
            label:'Free Virtual Memory',
            data:this.state.free,
            backgroundColor:'rgba(215,50,50,0.5)',
            borderColor:'rgba(215,50,50,0.5)',
            fill:false

          },
          {
            label:'Buffers',
            data:this.state.buffers,
            backgroundColor:'rgba(255,153,51,0.5)',
            borderColor:'rgba(255,153,51,0.5)',
            fill:false
          },
          {
            label:'Cached',
            data:this.state.cached,
            backgroundColor:'rgba(255,153,255,0.5)',
            borderColor:'rgba(255,153,255,0.5)',
            fill:false
          }]
        }}
        options={{
          scales:{
            yAxes:[{
              ticks:{
                beginATZero:true,
                min:0,
                max:1000
              },
              scaleLabel:{
                display:true,
                labelString:'MB'
              }
            }]
          }
        }}
      />
      </fieldset>
    )
  }
}
export class DiskUsageChart extends Component{
  constructor(props){
    super(props);
    this.state={
      used:0,
      total:0,
      free:0,
      usedPercent:0
    };
  }
  componentDidMount(){
    this.TimerID= setInterval(
      () => this.getDiskUsageData(),
      5000
    );
  }
  getDiskUsageData(){
    const url='http://cse.xited.io:8000/api/disk_usage';
    fetch(url)
    .then(res => res.json())
    .then(
      (result) =>{
        this.setState({
          used: Math.round(result.used/1048576),
          total: Math.round(result.total/1048576),
          free: Math.round(result.free/1048576),
          usedPercent: result.percent
        })
      }
    )
  }
  render(){
    return(
      <fieldset>
        <legend>Disk Usage Table</legend>
        <p>Total: {this.state.total} MB</p>
        <Pie
        data = {{
          labels: [
            'Disk Used',
            'Disk Free',
          ],
          datasets: [{
            data: [this.state.usedPercent, 100-this.state.usedPercent],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            ]
          }]
        }}
        />
      </fieldset>
    )
  }
}

export class NetInfoTable extends Component{
  constructor(props){
    super(props);
    this.state={};
  }
  componentDidMount(){
    this.TimerID= setInterval(
      () => this.getNetInfoData(),
      1000
    );
  }
  getNetInfoData(){
    const url='http://cse.xited.io:8000/api/net_info';
    fetch(url)
    .then(res =>res.json())
    .then(
      (result) =>{
        this.setState(result);
      }
    )
  }
  render(){
    var list=[];
    const net_info = this.state;
    for(var name in net_info){
      list.push(name);
      var items = net_info[name];
      for(var item in items){
        var temp_item = " "+item + ": ";
        var shit = items[item];
        for(var holly in shit){
          temp_item = temp_item + "<"+holly + ":" + shit[holly]+"> ";
        }
        list.push(temp_item);
      }
    }
    const html_list = list.map((list,i)=>
      <p key={i}>{list}</p>
    );
    const element = (
      <fieldset className="no-center">
      <legend>Network information</legend>
      {html_list}
      </fieldset>
    );
    return(element);
  }
}

export class ProcInfoTable extends Component{
  constructor(props){
    super(props);
    this.state={};
    this.getProcInfoData();
  }
  componentDidMount(){
    this.TimerID= setInterval(
      () => this.getProcInfoData(),
      5000
    );
  }
  getProcInfoData(){
    const url='http://cse.xited.io:8000/api/process';
    fetch(url)
    .then(res =>res.json())
    .then(
      (result) =>{
        this.setState(result);
      }
    )
  }
  render(){
    const data = Object.values(this.state);
    const columns = [{
      Header: 'pid',
      accessor: 'pid' // String-based value accessors!
    }, {
      Header: 'name',
      accessor: 'name'
    }, {
      Header: 'ppid',
      accessor: 'ppid'
    }, {
      Header: 'cmdline',
      accessor: 'cmdline'
    }, {
      Header: 'status',
      accessor: 'status'
    }, {
      Header: 'user',
      accessor: 'username'
    }, {
      Header: 'priority',
      accessor: 'priority'
    }, {
      Header: 'cpu usage',
      accessor: 'cpu_percent'
    }, {
      Header: 'memory usage',
      accessor: 'memory_percent'
    }, {
      Header: 'cwd',
      accessor: 'cwd'
    }, {
      Header: 'create time',
      accessor: 'create_time'
    }];
    return(
      <ReactTable
        data={data}
        columns={columns}
      />
    );
  }
}
