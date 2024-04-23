import React, {useContext} from 'react';
import { RemoteContext } from '../store/remote-context';

export default function Menu() {
  const { updateIsLocal } = useContext(RemoteContext);
  return (
    <div id="menu">
        <div><button onClick={() => updateIsLocal(true)}>Local</button></div>
        <div><button onClick={() => updateIsLocal(false)}>Remote</button></div>
    </div>
  )
}
