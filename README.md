# hairapy-api
Add API Documentation Here!

## Development Environment:
- Do not use Windows, since TensorflowJS Package is used

## API Documentation:
**/predict**  
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
- Body: { image: <image-file> }  

Output:  
{  
    "status": "success",  
    "message": "Prediction Success!",  
    "data": {  
        "result": "classification-value",  
        "ingredients": [  
            "ingredient-1",  
            "ingredient-2",  
            "ingredient-3"  
        ],  
        "recomendations": [  
            {  
                "image": "rec1-image-url",  
                "name": "rec1-name"  
            },  
            {  
                "image": "rec2-image-url",
                "name": "rec2-name"
            }
        ]
    }
}
