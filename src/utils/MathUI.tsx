// import { MathJaxContext, MathJax } from "better-react-mathjax"
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

import React, { useEffect, useRef } from 'react';

const DesmosGraph = () => {
	const calculatorRef = useRef(null);
	const calculatorInstance = useRef(null);
	
	useEffect(() => {
		const GraphClass = document.querySelector(".Graph");
		if (!document.querySelector('script[src*="desmos.com"]')) {
			const script = document.createElement('script');
			script.src = 'https://www.desmos.com/api/v1.10/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6';
			script.async = true;

			script.onload = () => {
				var elt = calculatorRef.current;
				calculatorInstance.current = Desmos.GraphingCalculator(elt, {
					zoomButtons	: false,
					keypad : false,
					expressions : false
				});

				calculatorInstance.current.setExpression(
				{
					id : 'line1', 
					latex : 'y=2x'
				})
			}
			document.body.appendChild(script);
		}
	}, []);

	return (
		<div className='Graph'>
			<div ref={calculatorRef} style={{ width: '600px', height: '400px' }} />
		</div>
	);
};

function App() {
  return (
    <div className="App">
      <DesmosGraph />
    </div>
  );
}

export default App;