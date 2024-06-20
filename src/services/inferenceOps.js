const tfjs = require('@tensorflow/tfjs-node');

const loadModel = async () => {
  /* API to Load the Model */
  console.log('Building Model...');
  const model = await tfjs.loadLayersModel(process.env.MODEL_URL);

  console.log('Building Model Succes!!');
  return model;
};

const modelPredict = async (model, image) => {
  const tensor = tfjs.node
    .decodeImage(image)
    .resizeNearestNeighbor([224, 224]).toFloat().div(tfjs.scalar(255.0))
    .expandDims();

  const prediction = model.predict(tensor);
  const score = await prediction.data();
  // console.log(score);

  const confidenceScore = Math.max(...score) * 100;
  // console.log(confidenceScore);

  const result = tfjs.argMax(prediction, 1).dataSync()[0];

  const classifications = ['Dandruff', 'Hair Greasy', 'Hair Loss', 'Psoriasis'];
  const predicted_class = classifications[result];

  const classification = predicted_class;
  const ingredients = [
    'ingredient-1',
    'ingredient-2',
    'ingredient-3',
  ];

  // Generate Recomendation

  const recommendations = [];

  let rec_image_url = '';
  let rec_name = '';

  switch (result) {
    case 0: {
      // Dandruff
      rec_name = 'Selsun Yellow Double Impact Shampoo';
      rec_image_url = 'https://storage.googleapis.com/hairapy-recomendations-bucket/Selsun%20Yellow%20Double%20Impact%C2%A0Shampoo.jpg';
      break;
    }

    case 1: {
      // Hair Greasy
      rec_name = 'Pantene Shampoo Anti-Lepek';
      rec_image_url = 'https://storage.googleapis.com/hairapy-recomendations-bucket/Pantene%20Shampoo%20Anti-Lepek.jpg';
      break;
    }

    case 2: {
      // Hair Loss
      rec_name = 'Lavojoy Hold Me Tight Pro Shampoo';
      rec_image_url = 'https://storage.googleapis.com/hairapy-recomendations-bucket/Lavojoy%20Hold%20Me%20Tight%20Pro%C2%A0Shampoo.jpg';
      break;
    }

    case 3: {
      // Psoriasis
      rec_name = 'Lifusha';
      rec_image_url = 'https://storage.googleapis.com/hairapy-recomendations-bucket/Lifusha.jpg';
      break;
    }

    default: {
      // Unknown
      break;
    }
  }

  const recomendation = {
    image: rec_image_url,
    name: rec_name,
  };

  recommendations.push(recomendation);

  return {
    result: classification, confidenceScore, ingredients, recommendations,
  };
};

module.exports = { loadModel, modelPredict };
