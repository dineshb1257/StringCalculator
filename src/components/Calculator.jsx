import React,{useState} from 'react'

const Calculator = () => {
    const [input,setInput] = useState('');
    const [result,setResult] = useState(0);
    const [error, setError] = useState("");

    const add = () =>{
        let finalString = '';
        let str = input;

        str = str.replace(/\n/g, ',');  // Accept new line
        str = str.replace(/\\n/g, ',').split(',').map(num=>num.trim()); // Accept to \n with windows
        finalString = str.join(',');

         // Convert string to numbers
         const nums = finalString.split(",").map(num => parseInt(num.trim(), 10));

         // Calculate and return the sum
        const validateNum =nums.filter(num=>!isNaN(num));
        const result = validateNum.reduce((acc,num)=>acc+num,0);

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