import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

const flushSync = ReactDOM.flushSync

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

  componentWillMount(){
    console.log('componentDidCatch');
  }

  componentDidMount(){
    console.log('componentDidCatch');
  }

  handleClick() {
    const {count1, count2, count3} = this.state
    this.setState({
      count1: count1 * count1,
      count2: count2 * count2,
      count3: count3 * count3,
    })
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

// class Parent extends React.Component {
//   state = {
//     async: true,
//     num: 1,
//     length: 2000,
//   }

//   componentDidMount() {
//     this.interval = setInterval(() => {
//       this.updateNum()
//     }, 200)
//   }

//   componentWillUnmount() {
//     // 别忘了清除interval
//     if (this.interval) {
//       clearInterval(this.interval)
//     }
//   }

//   updateNum() {
//     const newNum = this.state.num === 3 ? 0 : this.state.num + 1
//     if (this.state.async) {
//       this.setState({
//         num: newNum,
//       })
//     } else {
//       flushSync(() => {
//         this.setState({
//           num: newNum,
//         })
//       })
//     }
//   }

//   render() {
//     const children = []

//     const { length, num, async } = this.state

//     for (let i = 0; i < length; i++) {
//       children.push(
//         <div className="item" key={i}>
//           {num}
//         </div>,
//       )
//     }

//     return (
//       <div className="main">
//         async:{' '}
//         <input
//           type="checkbox"
//           checked={async}
//           onChange={() => flushSync(() => this.setState({ async: !async }))}
//         />
//         <div className="wrapper">{children}</div>
//       </div>
//     )
//   }
// }


ReactDOM.render(
    <HelloWorld/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
