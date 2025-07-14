// Configuración de Firebase para contador global de visitas
const firebaseConfig = {
  apiKey: "AIzaSyAzmU1ySmj4Nk5PcbOe9ed3AXEHT16tUB0",
  authDomain: "carbon-laveguita-visitas.firebaseapp.com",
  databaseURL: "https://carbon-laveguita-visitas-default-rtdb.firebaseio.com",
  projectId: "carbon-laveguita-visitas",
  storageBucket: "carbon-laveguita-visitas.firebasestorage.app",
  messagingSenderId: "924442578479",
  appId: "1:924442578479:web:4aaa0f06d71f42427640da",
  measurementId: "G-0C1Y32K68V"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Obtener referencia a la base de datos
const database = firebase.database(); 