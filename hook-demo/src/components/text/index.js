import React, {useState} from 'react';

function Text() {
    let [count, setCount] = useState(0)
    function clickMe() {
        setCount(count+1)
    }
    return (
        <div>
            <h1>点击了{count}次</h1>
            <button onClick={clickMe}>点击我</button>
        </div>
    )
}


export default Text