// import React, { useState } from 'react';
// import { SafeAreaView, TextInput, Button, Text } from 'react-native';
// import { tokenizeInput, runInference } from './models/OnnxInference';




// const App = () => {
//   const [input, setInput] = useState('');
//   const [output, setOutput] = useState('');

//   const handleInference = async () => {
//     try {
//       const inputTensor = await tokenizeInput(input);
//       const outputString = await runInference(inputTensor);
//       setOutput(outputString);
//     } catch (error) {
//       console.error('Error during inference:', error);
//       setOutput('Error performing inference.');
//     }
//   };

//   return (
//     <SafeAreaView>
//       <TextInput
//         value={input}
//         onChangeText={setInput}
//         placeholder="Input sentence"
//         style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
//       />
//       <Button
//         title="Run Inference"
//         onPress={handleInference}
//       />
//       <Text>Output: {output}</Text>
//     </SafeAreaView>
//   );
// };

// export default App;


import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, Text } from 'react-native';
import { tokenizeInput, runInference } from './models/OnnxInference';



const App = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleInference = async () => {
    try {
      const inputTensor = await tokenizeInput(input);
      const outputString = await runInference(inputTensor);
      setOutput(outputString);
    } catch (error) {
      console.error('Error during inference:', error);
      setOutput('Error performing inference.');
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Input sentence"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      />
      <Button
        title="Run Inference"
        onPress={handleInference}
      />
      <Text>Output: {output}</Text>
    </SafeAreaView>
  );
};

export default App;