import {useState} from 'react'

export default function GameLogs({gameLogs}) {
  return (
    <ol id="logger_shell" className='logger_shell'>
    <div>
        <h2>Game Logs :</h2>
    </div>
  {gameLogs.map((log) => (
    <li
      key={`${log}_${log}${123}`}
    >{`${log} `}</li>
  ))}
</ol>
  )
}
