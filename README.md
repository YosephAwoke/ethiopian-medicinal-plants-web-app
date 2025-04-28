Ethiopian Medicinal Plants
This project is a web-based platform that provides information about Ethiopian medicinal plants. It allows users to explore detailed information about various plants, their scientific names, local names, habitats, parts used, and medicinal uses. The platform also includes a deep learning-based plant prediction system.

Features
Plant Information: Explore a collection of Ethiopian medicinal plants with detailed information.
Plant Prediction: Upload an image of a plant to identify its species and learn about its medicinal uses using a deep learning model.
Responsive Design: The platform is fully responsive and works seamlessly on both desktop and mobile devices.
Interactive UI: Modern and user-friendly interface built with Tailwind CSS.
Technologies Used
Frontend: React, Tailwind CSS, Vite
Backend: FastAPI
Deep Learning: TensorFlow, Keras (Inception ResNetV2 model)
Database: JSON-based data for plant information
Installation
Clone the repository:

git clone https://github.com/your-username/ethiopian-medicinal-plants.git

Navigate to the project directory:

cd ethiopian-medicinal-plants

Install dependencies for the client:

cd client
npm install

Install dependencies for the server:

cd ../server
pip install -r requirements.txt

Usage

Start the backend server:

uvicorn main:app --reload

Start the frontend development server:

cd client
npm run dev

Open your browser and navigate to http://localhost:5173.

Project Structure
Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

License
This project is licensed under the MIT License.
