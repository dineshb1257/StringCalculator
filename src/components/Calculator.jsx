import React,{useState} from 'react'

const Calculator = () => {
    const [input,setInput] = useState('');
    const [result,setResult] = useState(0);
    const [error, setError] = useState("");

    const add = () =>{

        setError("");
        setResult(result);
    }

    const handleChange = (e) => {
        if(e.target.value==='')
        {
            setInput("")
            setResult(0);
            setError("");
        }
        else
        {
            setInput(e.target.value)
        }
    };

    return (
    <>
        <div className="calculator">
            <label>
            <h1>String Calculator</h1>
            </label>
            <textarea 
                onChange={handleChange}
                type="text" id="input" value={input} className="input-field" 
                placeholder="Please enter string" 
                data-testid='Input'
            />
            <button data-testid='btn-click' onClick={add}>Calculate</button>
            <div className="result">
                <label><b>Result:</b></label>
                <span data-testid='Output'>{result}</span>
            </div>
            {error && <div data-testid="negative_number" className="displayErr">{error}</div>}
        </div>
    </>
    )
}

export default Calculator