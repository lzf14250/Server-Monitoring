import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import $ from 'jquery';
import {findDOMNode} from 'react-dom';
import  {SysChart, CPUPercentChart, CPUCountChart, CPUTimesChart, NetSpeedChart} from './component/Chart';
import {MemUsageChart, DiskUsageChart, NetInfoTable, ProcInfoTable} from './component/Chart'


class App extends Component {

  constructor(props){
    super(props);
    this.logout=this.logout.bind(this);
  }
  logout(){
    window.location.href = "http://cse.xited.io:8000/logout";
  }
  render() {
    return (
      <div className="App">
        <header ref='toggle' className="App-header">
          <h1 className="App-title">Welcome to Pythonitor</h1>
          <button onClick={this.logout}>Log out</button>
        </header>
        <div className="detail">
          <div className="halfWidth left">
            <SysChart />
            <CPUTimesChart />
            <NetInfoTable />
            <NetSpeedChart />
            <MemUsageChart />
          </div>
          <div className="halfWidth right">
            <CPUPercentChart />
            <DiskUsageChart />
            <ProcInfoTable />
          </div>
        </div>
      </div>
    );
  };
}

export default App;
