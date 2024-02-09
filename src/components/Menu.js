import React from 'react'

export default function Menu({menuHandler}) {
  return (
    <div id="menu">
        <div><button onClick={() => menuHandler(true)}>Local</button></div>
        <div><button onClick={() => menuHandler(false)}>Remote</button></div>
    </div>
  )
}
