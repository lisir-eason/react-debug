import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

const flushSync = ReactDOM.flushSync

import SchedulerTask from './component/SchedulerTask'
import Parent from './component/Parent'

import Scheduler from 'scheduler'
let NormalPriority = Scheduler.unstable_NormalPriority;
let ImmediatePriority = Scheduler.unstable_ImmediatePriority;
let LowPriority = Scheduler.unstable_LowPriority;
let scheduleCallback = Scheduler.unstable_scheduleCallback;

// function test1() {
//     scheduleCallback(NormalPriority, () => {
//         console.log('A')
//     })
//     scheduleCallback(ImmediatePriority, () => {
//         console.log('B')
//     })
//     scheduleCallback(LowPriority, () => {
//         console.log('C')
//     })
//     scheduleCallback(NormalPriority, () => {
//         console.log('D')
//     })
//     // console.log('out log tag')
// }
// test1();

class HelloWorld extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count1: 1,
      count2: 2,
      count3: 3,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  // componentWillMount(){
  //   console.log('componentWillMount');
  // }

  componentDidMount(){
    console.log('componentDidMount');
    const {count1, count2, count3} = this.state
    this.setState({
      count1: count1 * count1,
    })
    this.setState({
      count2: count2 * count2,
    })
    this.setState({
      count3: count3 * count3,
    })
  }

  handleClick() {
    
  }

  render(){
    const {count1, count2, count3} = this.state
    return (
      <React.Fragment>
        <p>{count1}</p>
        <p>{count2}</p>
        <p>{count3}</p>
        <button onClick={this.handleClick}>点我</button>
      </React.Fragment>
    )
  }
}


// ReactDOM.render(
//   <Parent/>,
//   document.getElementById('root')
// );

ReactDOM.unstable_createRoot(
  document.getElementById('root')
).render(<Parent />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
