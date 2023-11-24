// Sample data for demonstration
const data = [ { x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 7 }, { x: 4, y: 9 }, { x: 5, y: 15 } ];
  
  // Function to calculate the mean of an array
  const calculateMean = (arr) => arr.reduce((sum, value) => sum + value, 0) / arr.length;
  
  // Function to calculate the linear regression parameters
  const calculateLinearRegression = (data) => {
    const n = data.length;
  
    // Calculate the means of x and y
    const meanX = calculateMean(data.map((point) => point.x));
    const meanY = calculateMean(data.map((point) => point.y));
  
    // Calculate the slope (m) and intercept (b) of the best-fit line
    const numerator = data.reduce((sum, point) => sum + (point.x - meanX) * (point.y - meanY), 0);
    const denominator = data.reduce((sum, point) => sum + Math.pow(point.x - meanX, 2), 0);
  
    const slope = numerator / denominator;
    const intercept = meanY - slope * meanX;
  
    return { slope, intercept };
  };
  
  // Function to predict the y value for a given x using the linear regression model
  const predict = (x, slope, intercept) => slope * x + intercept;
  
  // Calculate linear regression parameters
  const regressionParams = calculateLinearRegression(data);
  
  // (y = mx + b) Display the linear regression equation
  console.log(`Linear Regression Equation: y = ${regressionParams.slope}x + ${regressionParams.intercept}`);
  
  // Make predictions for new x values
  const newXValues = [6, 7, 8];
  newXValues.forEach((x) => {
    const predictedY = predict(x, regressionParams.slope, regressionParams.intercept);
    console.log(`Predicted y for x=${x}: ${predictedY}`);
  });
