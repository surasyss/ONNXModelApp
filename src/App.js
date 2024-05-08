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


import React, { useEffect, useState } from 'react';
import { SafeAreaView, TextInput, Button, Text, PermissionsAndroid } from 'react-native';
import { tokenizeInput, runInference } from './models/OnnxInference';
import RNFS from 'react-native-fs';


const App = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [modelPath, setModelpath] = useState('');

  useEffect(() => {
    const filePath = `${RNFS.DownloadDirectoryPath}/phi3-mini-128k-instruct-cpu-int4-rtn-block-32.onnx`;

    RNFS.exists(filePath)
      .then((exists) => {
        if (exists) {
          console.log('File exists');
          setModelpath(filePath);
        } else {
          console.log('File does not exist');
          downloadFile();
        }
      })
      .catch((error) => {
        console.log(error);
      });

    const downloadFile = async () => {
      const options = {
        fromUrl: "https://huggingface.co/microsoft/Phi-3-mini-128k-instruct-onnx/resolve/main/cpu_and_mobile/cpu-int4-rtn-block-32/phi3-mini-128k-instruct-cpu-int4-rtn-block-32.onnx",
        toFile: filePath,
        // progress: (res) => { console.log(res) }
      }
      //Call downloadFile
      const response =  await RNFS.downloadFile(options);
      response.promise.then(async res => {
        console.log('res', res)
        if(res && res.statusCode === 200 && res.bytesWritten > 0){
          console.log('res.path', filePath);
          setModelpath(filePath);
        }
      })
    }
  }, [])

  const handleInference = async () => {
    try {
      const inputTensor = await tokenizeInput(input);
      const outputString = await runInference(inputTensor, modelPath);
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