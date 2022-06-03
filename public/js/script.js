const app = {
  //^VARIABLES
  baseUrl: `${location.origin}/v1`,
  container: document.querySelector('main'),

  //^INITIALIZATION
  async init() {
    console.log('TEST', location.origin);
    await app.fetchCadex();
    await app.tryPost();
    await app.fetchAllCadex();
    document.querySelector('#again').addEventListener('click', app.fetchCadex);
    document.querySelector('.formOpen').addEventListener('click', app.showForm);
    document.querySelector('.formClose').addEventListener('click', app.hideForm);
    document.querySelector('form').addEventListener('submit', app.postCadex);
  },

  clearWords() {
    const words = app.container.querySelectorAll('.word');
    for (const word of words) {
      word.remove();
    }
  },

  createWord(word, index) {
    const span = document.createElement('span');
    span.classList.add('word');
    span.textContent = word;
    span.style.animationDelay = index / 4 + 's';
    return span;
  },

  displayPhrase(phrase) {
    //on retire l'éventuelle phrase affichée précédemment
    app.clearWords();
    //on récupère chaque mot dans un tableau
    const words = phrase.split(' ');
    //on crée un span avec un délai d'affichage pour l'animation
    const spans = words.map(app.createWord);
    //on ajoute les spans en spreadant le tableau
    app.container.append(...spans);
  },

  //teste la présence de la route POST sur le serveur et affiche le formulaire si elle est présente
  async tryPost() {
    try {
      const response = await fetch(`${app.baseUrl}/cadex`, { method: 'POST' });
      if (response.status !== 404) {
        document.querySelector('.formOpen').style.display = 'block';
      }
    } catch (error) {
      console.error(error);
    }
  },

  showForm() {
    document.querySelector('.formOpen').style.display = 'none';
    document.querySelector('form').style.display = 'block';
  },

  hideForm() {
    document.querySelector('form').style.display = 'none';
    document.querySelector('.formOpen').style.display = 'block';
  },

  async postCadex(event) {
    //on intercepte la validation du formulaire par le user
    event.preventDefault();
    const json = {};
    //on place les infos des inputs dans un object
    for (let i = 0; i < 4; i++) {
      const input = event.target[i];
      if (input.value) {
        json[input.id] = input.value;
      }
    }
    console.log(json);
    try {
      //on envoie l'object stringifié au serveur en indiquant le bon Content-Type
      const response = await fetch(`${app.baseUrl}/cadex`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(json)
      });
      const phrase = await response.json();
      //on affiche la phrase reçue en réponse
      app.displayPhrase(phrase);
    } catch (error) {
      console.error(error);
    }
  },

  //récupération d'un cadex aléatoire ou configuré via la queryString
  //cette string est stockée dans la variable location.search, on la retransmet telle quelle à la route
  async fetchCadex() {
    try {
      const response = await fetch(`${app.baseUrl}/cadex${location.search}`);
      const phrase = await response.json();
      app.displayPhrase(phrase);
    } catch (error) {
      console.error(error);
    }
    },
  
//^Testing json file
  async fetchAllCadex() {
    try {
      const response = await fetch('http://localhost:4100/v1');

      if (response.ok) {
        const tableBodyElement = document.querySelector('tbody');
        const parts = await response.json();
  
        let completeSentence;

        for (const name of parts.names) {
          const template = document.querySelector('#template-sentence');
          const clone = document.importNode(template.content, true);
          const rowElement = clone.querySelector('tr');

          //~get random element from array
          //source https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
          const randomName = parts.names[Math.floor(Math.random() * parts.names.length)];
          const randomAdjectives = parts.adjectives[Math.floor(Math.random() * parts.adjectives.length)];
          const randomVerbs = parts.verbs[Math.floor(Math.random() * parts.verbs.length)];
          const randomComplements = parts.complements[Math.floor(Math.random() * parts.complements.length)];

          //~write the sentence
          completeSentence = rowElement.querySelector(
            '.sentence'
          ).textContent = `${randomName} ${randomAdjectives} ${randomVerbs} ${randomComplements}`;
          tableBodyElement.appendChild(rowElement);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
};

app.init();
