import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const videojuegos = [
  { pregunta: '¿Cuál es el personaje principal de The Legend of Zelda?',
    opciones: ['Link', 'Mario', 'Sonic', 'Pikachu'], correcta: 0 },
  { pregunta: '¿Qué empresa creó a Mario?',
    opciones: ['Sega', 'Nintendo', 'Sony', 'Microsoft'], correcta: 1 },
  { pregunta: '¿En qué juego existen los Creepers y se construye con bloques?',
    opciones: ['Fortnite', 'Tetris', 'Minecraft', 'Among Us'], correcta: 2 },
  { pregunta: '¿Quién es la mascota clásica de Sega?',
    opciones: ['Kirby', 'Pac-Man', 'Crash', 'Sonic'], correcta: 3 },
  { pregunta: '¿Qué princesa suele rescatar Mario?',
    opciones: ['Peach', 'Zelda', 'Samus', 'Lara'], correcta: 0 },
];

const anime = [
  { pregunta: '¿Quién es el autor de Naruto?',
    opciones: ['Eiichiro Oda', 'Masashi Kishimoto', 'Akira Toriyama', 'Hajime Isayama'], correcta: 1 },
  { pregunta: '¿Quién es el protagonista de Dragon Ball?',
    opciones: ['Vegeta', 'Gohan', 'Goku', 'Krilin'], correcta: 2 },
  { pregunta: '¿Quién quiere ser el Rey de los Piratas en One Piece?',
    opciones: ['Zoro', 'Sanji', 'Usopp', 'Luffy'], correcta: 3 },
  { pregunta: '¿Qué estudio creó El viaje de Chihiro?',
    opciones: ['Studio Ghibli', 'Madhouse', 'Bones', 'Toei'], correcta: 0 },
  { pregunta: '¿Quién es el protagonista de Attack on Titan?',
    opciones: ['Levi', 'Eren', 'Armin', 'Mikasa'], correcta: 1 },
];
const tecnologia = [
  { pregunta: "¿Qué red social es de Meta y es solo de fotos y videos?", opciones: ["TikTok", "Instagram", "X", "Telegram"], correcta: 1 },
  { pregunta: "¿Qué significa USB?", opciones: ["Universal Serial Bus", "Ultra Sound Box", "United System Beta", "Universal Save Button"], correcta: 0 },
  { pregunta: "¿Cuál es el sistema operativo de los celulares Samsung?", opciones: ["iOS", "Windows", "Android", "Linux"], correcta: 2 },
  { pregunta: "¿Qué hace el botón de Guardar en una app?", opciones: ["Borra todo", "Cierra la app", "Guarda tu progreso", "Apaga el celular"], correcta: 2 },
  { pregunta: "¿Qué es la nube?", opciones: ["Un tipo de lluvia", "Guardar archivos en internet", "Un antivirus", "Un juego"], correcta: 1 },
];

const musica = [
  { pregunta: "¿Que cantante es conocido actualmente como el Conejo Malo?", opciones: ["Karol G", "Feid", "Bad Bunny", "J Balvin"], correcta: 2 },
  { pregunta: "¿Qué instrumento toca un baterista?", opciones: ["Piano", "Batería", "Violín", "Guitarra"], correcta: 1 },
  { pregunta: "¿Qué grupo canta BACHATA ?", opciones: ["AVENTURA", "SONUS", "Coldplay", "One Direction"], correcta: 0 },
  { pregunta: "¿Cómo se llama cuando una canción se repite mucho en TikTok?", opciones: ["Trend", "Spam", "Error", "Bug"], correcta: 0 },
  { pregunta: "¿Qué artista canta 'Provenza'?", opciones: ["Shakira", "Karol G", "Rosalía", "Becky G"], correcta: 1 },
];
const culturaDigital = [
  { pregunta: "¿Qué es un 'streamer en el mundo de los videojuegos'?", opciones: ["Una persona que transmite en vivo", "Un tipo de cable", "Un virus", "Un profesor"], correcta: 0 },
  { pregunta: "¿Qué significa GG cuando terminas una partida?", opciones: ["Good Game", "Go Go", "Game Gone", "Good Gone"], correcta: 0 },
  { pregunta: "¿Qué plataforma es famosa por hacer directos de videojuegos?", opciones: ["Twitch", "Word", "Excel", "Drive"], correcta: 0 },
  { pregunta: "¿Qué es un avatar en lso videojuegos?", opciones: ["Tu foto de perfil o personaje que te representa", "Un virus", "Un juego de carros", "Una contraseña"], correcta: 0 },
  { pregunta: "¿Qué significa spoiler?", opciones: ["Contar algo de una serie antes de que la veas", "Algun tipo de musica", "Un filtro", "Un like"], correcta: 0 },
];

export default function App() {
  const [pantalla, setPantalla] = useState('inicio');
  const [tema, setTema] = useState('videojuegos');
  const [nombre, setNombre] = useState('');
  const [indice, setIndice] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [correctas, setCorrectas] = useState(0);
  const [seleccion, setSeleccion] = useState(null);

  // Esto es lo que conecta tu tema con tus preguntas
  const getPreguntas = () => {
    if (tema === 'videojuegos') return videojuegos;
    if (tema === 'anime') return anime;
    if (tema === 'tecnologia') return tecnologia;
    if (tema === 'musica') return musica;
    if (tema === 'culturaDigital') return culturaDigital;
    return videojuegos;
  };

  const preguntas = getPreguntas();
  const preguntaActual = preguntas[indice];

  const responder = (i: number) => {
    if (seleccion !== null) return;
    setSeleccion(i);
    if (i === preguntaActual.correcta) {
      setPuntaje(puntaje + 20);
      setCorrectas(correctas + 1);
    }
  };

  const siguiente = () => {
    if (indice + 1 < preguntas.length) {
      setIndice(indice + 1);
      setSeleccion(null);
    } else {
      setPantalla('resultados');
    }
  };

  const empezar = () => {
    setPuntaje(0);
    setCorrectas(0);
    setIndice(0);
    setSeleccion(null);
    setPantalla('quiz');
  }
  ;
    if (pantalla === 'inicio') {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>🎮 QUIZZONE</Text>
        <Text style={styles.subtitulo}>Elige tu tema y demuestra lo que sabes</Text>

        <Text style={styles.label}>Tu nombre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Elige un tema:</Text>
        <Pressable style={[styles.botonTema, tema === 'videojuegos' && styles.botonActivo]} onPress={() => setTema('videojuegos')}>
          <Text style={styles.textoBoton}>🎮 Videojuegos</Text>
        </Pressable>
        <Pressable style={[styles.botonTema, tema === 'anime' && styles.botonActivo]} onPress={() => setTema('anime')}>
          <Text style={styles.textoBoton}>🍥 Anime</Text>
        </Pressable>
        <Pressable style={[styles.botonTema, tema === 'tecnologia' && styles.botonActivo]} onPress={() => setTema('tecnologia')}>
          <Text style={styles.textoBoton}>💻 Tecnología</Text>
        </Pressable>
        <Pressable style={[styles.botonTema, tema === 'musica' && styles.botonActivo]} onPress={() => setTema('musica')}>
          <Text style={styles.textoBoton}>🎵 Música</Text>
        </Pressable>
        <Pressable style={[styles.botonTema, tema === 'culturaDigital' && styles.botonActivo]} onPress={() => setTema('culturaDigital')}>
          <Text style={styles.textoBoton}>🌐 Cultura Digital</Text>
        </Pressable>

        <Pressable style={styles.botonEmpezar} onPress={empezar}>
          <Text style={styles.textoBoton}>¡EMPEZAR! 🚀</Text>
        </Pressable>
      </ScrollView>
    );
  }

  if (pantalla === 'resultados') {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>🏆 ¡Terminaste {nombre}!</Text>
        <Text style={styles.subtitulo}>Puntaje: {puntaje} puntos</Text>
        <Text style={styles.subtitulo}>Correctas: {correctas} de {preguntas.length}</Text>
        <Pressable style={styles.botonEmpezar} onPress={() => setPantalla('inicio')}>
          <Text style={styles.textoBoton}>JUGAR DE NUEVO</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitulo}>Pregunta {indice + 1} de {preguntas.length}</Text>
      <Text style={styles.subtitulo}>Puntos: {puntaje}</Text>
      <Text style={styles.pregunta}>{preguntaActual.pregunta}</Text>

      {preguntaActual.opciones.map((opcion, i) => (
        <Pressable
          key={i}
          style={[
            styles.opcion,
            seleccion === i && i === preguntaActual.correcta && styles.correcta,
            seleccion === i && i !== preguntaActual.correcta && styles.incorrecta,
          ]}
          onPress={() => responder(i)}
        >
          <Text style={styles.textoOpcion}>{opcion}</Text>
        </Pressable>
      ))}

      {seleccion !== null && (
        <Pressable style={styles.botonEmpezar} onPress={siguiente}>
          <Text style={styles.textoBoton}>{indice + 1 < preguntas.length ? 'SIGUIENTE ➡️' : 'VER RESULTADOS'}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#111827' },
  titulo: { fontSize: 36, fontWeight: 'bold', color: 'white', textAlign: 'center', marginTop: 30 },
  subtitulo: { fontSize: 18, color: 'white', textAlign: 'center', marginVertical: 10 },
  label: { fontSize: 16, color: 'white', marginTop: 20 },
  input: { backgroundColor: 'white', padding: 12, borderRadius: 10, marginTop: 8 },
  botonTema: { backgroundColor: '#374151', padding: 16, borderRadius: 10, marginTop: 10 },
  botonActivo: { backgroundColor: '#9b8bb8' },
  botonEmpezar: { backgroundColor: '#5322c5', padding: 16, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  textoBoton: { color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  pregunta: { fontSize: 22, fontWeight: 'bold', color: 'white', marginVertical: 20 },
  opcion: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginTop: 10 },
  textoOpcion: { fontSize: 16 },
  correcta: { backgroundColor: '#c5ad22' },
  incorrecta: { backgroundColor: '#4dc4ba' },
});



