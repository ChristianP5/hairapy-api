# ✨hairapy-api✨

Please Add the API Documentation Here!

## Notes for Development Environment:

- Do not use Windows, since TensorflowJS Package is used
- OR remove '@tensorflow/tfjs-node' from package.json
  **before running 'npm install'**

## API Documentation:

**/predict**

- 🔴 Send an Image as an Input to the Multi-Class Machine Learning Model
- ✔️ Records output in Firestore
- ✔️ Returns Inference result as JSON

Input:

- Image

Output:

- result&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;Model Prediction Result&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"What is the Hair Condition?"
- ingredients&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;Model Ingredients Output&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"What ingredients to avoid based on Hair Condition?"
- recomendations&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;Model Recomendations Output&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"What are Indonesian Hair Product Recomendations?"

_Example_  
Input:

- Path: 'BASE_URL
  **/predict**
  '
- Method: 'POST'
- Body: { image: \<image-file\> }

Output:  
![WhatsApp Image 2024-06-07 at 12 47 27_a66c6bcd](https://github.com/ChristianP5/hairapy-api/assets/119984279/d4dfd717-e764-4982-891b-6af490c9eed9)

&nbsp;&nbsp;&nbsp;]  
&nbsp;&nbsp;}  
&nbsp;}
