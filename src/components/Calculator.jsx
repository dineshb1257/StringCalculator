import React,{useState} from 'react'

const Calculator = () => {
    const [input,setInput] = useState('');
    const [result,setResult] = useState(0);
    const [error, setError] = useState("");

    const add = () =>{
        let finalString = '';
        let str = input;

        //let allowedDelimiter = `[@&#$;`;

        // Check pattern //& //@ //# //$ //; end with \n
        const regex = /^\/\/([@&#$;])\\n(.*)/;

        const delimiter = str.match(regex);
        let divider = delimiter ? delimiter[1].trim() : null;
       
        //console.log('divider-->',divider)

        // Split login for delimiter
        if(divider)
        {
            finalString = str.replace(/\\n/g, ','); 
            finalString = finalString.replace("//"+divider, ',');
            finalString = finalString.replace(divider, ',');
        }
        else
        {
            str = str.replace(/\n/g, ',');  // Accept new line
            str = str.replace(/\\n/g, ',').split(',').map(num=>num.trim()); // Accept to \n with windows
            finalString = str.join(',')
        }

        // Check any alphabet found
        if(validateDataDisplayError("ALPHA",finalString)) return;

         // Convert string to numbers
         const nums = finalString.split(",").map(num => parseInt(num.trim(), 10));

         // Calculate and return the sum
        const validateNum =nums.filter(num=>!isNaN(num));
        const result = validateNum.reduce((acc,num)=>acc+num,0);

        setError("");
        setResult(result);
    }

    const validateDataDisplayError = (etype,data) =>{
        let error =0
        let msg = '';
        let arr,arr1;
        switch(etype){
            case "ALPHA":
                arr1 = data.match(/[a-zA-Z\s]/g);
                arr = [...new Set(arr1)];
                if(arr && arr.length>0){
                    msg = `Alphabet & space not allowed: ${arr.join(", ")}`;
                    error =1;
                    setErrorCommon(msg);
                }
                break;

            case "NOT_ALLOW":
                arr1 = data.match(/(-\d+|[^0-9,\s])/g);
                arr = [...new Set(arr1)];
                if(arr && arr.length>0)
                {
                    msg = `Specail chars not allowed: ${arr.join(", ")}`;
                    error =1;
                    setErrorCommon(msg);
                }
                break;
        }
        return error;
    }

    const setErrorCommon = (msg) =>{
        setError(msg);
        setResult('Error');
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