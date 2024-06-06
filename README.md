# ✨hairapy-api✨
Add the API Documentation Here!

## Development Environment:
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

*Example*  
Input:
- Path:  'BASE_URL
**/predict**
'
- Method: 'POST'
- Body: { image: \<image-file\> }  

Output:  
&nbsp;{  
&nbsp;&nbsp;&nbsp;"status": "success",  
&nbsp;&nbsp;&nbsp;"message": "Prediction Success!",  
&nbsp;&nbsp;&nbsp;"data": {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"result": "classification-value",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ingredients": [  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ingredient-1",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ingredient-2",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ingredient-3"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"recomendations": [  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"image": "rec1-image-url",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "rec1-name"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"image": "rec2-image-url",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "rec2-name"  
&nbsp;&nbsp;&nbsp;&nbsp;}  
&nbsp;&nbsp;&nbsp;]  
&nbsp;&nbsp;}  
&nbsp;}  
