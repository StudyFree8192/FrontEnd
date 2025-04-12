import { MathJaxContext, MathJax } from "better-react-mathjax"
// import Chart from 'chart.js/auto';
// import { getRelativePosition } from 'chart.js/helpers';

// import axios from "axios";
// import { useEffect, useRef, useState } from "react";

// const chart = new Chart(ctx, {
//     type: 'line',
//     data: data,
//     options: {
//       onClick: (e) => {
//         const canvasPosition = getRelativePosition(e, chart);
  
//         // Substitute the appropriate scale IDs
//         const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
//         const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
//       }
//     }
//   });

{/* <p>
                <MathJaxContext>
                    <MathJax>{"\\(\\sqrt{10}\\)"}</MathJax>
                </MathJaxContext>
            </p> */}

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

// const DesmosGraph = () => {
// 	const calculatorRef = useRef(null);
// 	const calculatorInstance = useRef(null);
	
// 	useEffect(() => {
// 		const GraphClass = document.querySelector(".Graph");
// 		if (!document.querySelector('script[src*="desmos.com"]')) {
// 			const script = document.createElement('script');
// 			script.src = 'https://www.desmos.com/api/v1.10/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6';
// 			script.async = true;

// 			script.onload = () => {
// 				var elt = calculatorRef.current;
// 				calculatorInstance.current = Desmos.GraphingCalculator(elt, {
// 					zoomButtons	: false,
// 					keypad : false,
// 					expressions : false
// 				});

// 				calculatorInstance.current.setExpression(
// 				{
// 					id : 'line1', 
// 					latex : 'y=2x'
// 				})
// 			}
// 			document.body.appendChild(script);
// 		}
// 	}, []);

// 	return (
// 		<div className='Graph'>
// 			<div ref={calculatorRef} style={{ width: '600px', height: '400px' }} />
// 		</div>
// 	);
// };

function App() {

	async function RunCode() {
		axios.get('https://judge0-extra-ce.p.rapidapi.com/about', {
			headers: {
			  'x-rapidapi-host': 'judge0-extra-ce.p.rapidapi.com',
			  'x-rapidapi-key': 'c993f2ead0mshcd292d5c8f48b29p1e19f5jsnd7f8c4f6bda0'
			}
		  })
		  .then(response => {
			console.log(response.data);
		  })
		  .catch(error => {
			console.error('Lỗi:', error);
		});
	}

	const [htmlContent, setHtmlContent] = useState('');
	const [value, setValue] = useState('');

	function handleCodeMath() {
		axios.post("http://localhost:8192/handleCodeMath", {
			MathText : htmlContent
		}).then(
			res => {
				console.log(res.data)
				setValue(res.data)
			}
		)

	}

	const config = {
		loader: { load: ['input/tex', 'output/svg'] },
		tex: {
		inlineMath: [['\\(', '\\)']],
		displayMath: [['\\[', '\\]']],
		},
  	};

  	return (

    	<div className="p-4">
      {/* Input field */}
      <input
        type="text"
        className="w-full p-[20px] text-[20px] border-[1px]"
        onChange={(e) => setHtmlContent(e.target.value)}
        placeholder="Enter HTML content"
      />

	  <button onClick={handleCodeMath} className="border-[1px]">Run Code</button>
      <div className="mt-4">
        <h2>Preview:</h2>
        <MathJaxContext config={config}>
			<div className="text-[50px]">
				<MathJax>
					{value}
        		</MathJax>
  			</div>
        </MathJaxContext>
      </div>
    </div>
  	);
}

export default App;