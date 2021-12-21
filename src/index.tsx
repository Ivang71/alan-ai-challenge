import { render } from 'react-dom'
import { App } from './App/App'

const div = document.createElement('div')
document.body.appendChild(div)

render(
  <App/>,
  div,
)
