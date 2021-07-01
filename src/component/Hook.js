import * as React from 'react';
import * as ReactDOM from 'react-dom';


const HookDemo = () => {

  const [count, setCount] = React.useState(1)
  const [name, setName] = React.useState('name')

  const handleClick = () => {
    setCount(count + 1)
    setName(name + 'dd')
  }

  React.useEffect(() => {
    console.log('123');
  }, [count])

  return (
    <div>
      {count}
      {name}
      <button onClick={handleClick}>点我</button>
    </div>
  )
}

export default HookDemo