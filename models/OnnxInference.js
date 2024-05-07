// import { Llama2Tokenizer } from "@lenml/llama2-tokenizer";
// import { load_vocab } from "@lenml/llama2-tokenizer-vocab-llama2";
// import ort from 'onnxruntime-react-native';
// export const tokenizeInput = async (input) => {
//   const tokenizer = new Llama2Tokenizer();
//   const vocab_model = load_vocab();
//   tokenizer.install_vocab(vocab_model);

//   // Use the tokenizer to encode the input string
//   const encodedInput = tokenizer.encode(input);

//   // Convert the encoded input into a tensor
//   const inputTensor = new ort.Tensor('int32', new Int32Array(encodedInput.ids), [1, encodedInput.ids.length]);

//   return inputTensor;
// };

// export const runInference = async (inputTensor) => {
//   // Load the ONNX model
//   const session = await ort.InferenceSession.create('models/phi3-mini-128k-instruct-cpu-int4-rtn-block-32.onnx');

//   // Prepare the input for the model
//   const feeds = { input: inputTensor };

//   // Run the model
//   const results = await session.run(feeds);

//   // Assume the output is in a tensor of token IDs
//   const outputTensor = results.output; // Adjust this according to your model's output key
//   const outputIds = outputTensor.data;

//   // Decode the output token IDs back to a string
//   const tokenizer = new Llama2Tokenizer();
//   const vocab_model = load_vocab();
//   tokenizer.install_vocab(vocab_model);
//   const outputString = tokenizer.decode(outputIds);

//   return outputString;
// };

// const main = async () => {
//   const input = "你好，世界！";
//   const inputTensor = await tokenizeInput(input);
//   const outputString = await runInference(inputTensor);
//   console.log('Model output:', outputString);
// };

// main();




import { Llama2Tokenizer } from "@lenml/llama2-tokenizer";
import { load_vocab } from "@lenml/llama2-tokenizer-vocab-llama2";
import ort from 'onnxruntime-react-native';


export const tokenizeInput = async (input) => {
  const tokenizer = new Llama2Tokenizer();
  const vocab_model = load_vocab();
  tokenizer.install_vocab(vocab_model);

  // Use the tokenizer to encode the input string
  const encodedInput = tokenizer.encode(input);

  // Convert the encoded input into a tensor
  const inputTensor = new ort.Tensor('int32', new Int32Array(encodedInput.ids), [1, encodedInput.ids.length]);

  return inputTensor;
};

export const runInference = async (inputTensor) => {
  // Load the ONNX model
  const session = await ort.InferenceSession.create('models/phi3-mini-128k-instruct-cpu-int4-rtn-block-32.onnx');

  // Prepare the input for the model
  const feeds = { input: inputTensor };

  // Run the model
  const results = await session.run(feeds);

  // Assume the output is in a tensor of token IDs
  const outputTensor = results.output; // Adjust this according to your model's output key
  const outputIds = outputTensor.data;

  // Decode the output token IDs back to a string
  const tokenizer = new Llama2Tokenizer();
  const vocab_model = load_vocab();
  tokenizer.install_vocab(vocab_model);
  const outputString = tokenizer.decode(outputIds);

  return outputString;
};

const main = async () => {
  const input = "你好，世界！";
  const inputTensor = await tokenizeInput(input);
  const outputString = await runInference(inputTensor);
  console.log('Model output:', outputString);
};

main();