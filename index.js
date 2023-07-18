const prompt = require('prompt-sync')({ sigint: true });

// Testen der prompt-Funktion, um Benutzereingaben zu erhalten
let name = prompt('Wie ist dein Name? ');
console.log(`User's input is: ${name}`);

// Funktion zur Generierung einer geheimen Zahl
function generateSecretNumber() {
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let secret = '';

  while (secret.length < 4) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    const digit = digits[randomIndex];

    if (!secret.includes(digit)) {
      secret += digit;
    }
  }
console.log(secret);
  return secret;
}

function getBullsAndCows(guess, secret) {
  let bulls = 0; // Zähler für die Anzahl der Stiere
  let cows = 0; // Zähler für die Anzahl der Kühe
  const secretDigitsCount = {}; // Objekt zur Zählung der Ziffern in der geheimen Zahl
  const guessDigitsCount = {}; // Objekt zur Zählung der Ziffern im Tipp des Spielers

  // Schleife durchläuft alle Ziffern des Spieler-Tipps und der geheimen Zahl
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === secret[i]) {
      bulls++; // Falls Ziffer an gleicher Position, erhöhe Stiere-Zähler
    } else {
      const secretDigit = secret[i]; // Aktuelle Ziffer in der geheimen Zahl
      const guessDigit = guess[i]; // Aktuelle Ziffer im Tipp des Spielers

      // Zähle die Häufigkeit der einzelnen Ziffern in der geheimen Zahl
      if (secretDigitsCount[secretDigit]) {
        secretDigitsCount[secretDigit]++;
      } else {
        secretDigitsCount[secretDigit] = 1;
      }

      // Zähle die Häufigkeit der einzelnen Ziffern im Tipp des Spielers
      if (guessDigitsCount[guessDigit]) {
        guessDigitsCount[guessDigit]++;
      } else {
        guessDigitsCount[guessDigit] = 1;
      }
    }
  }

  // Durchlaufe alle Ziffern im Tipp des Spielers
  for (const digit in guessDigitsCount) {
    if (secretDigitsCount[digit]) {
      // Berechne die Anzahl der gemeinsamen Ziffern (Kühe)
      cows += Math.min(secretDigitsCount[digit], guessDigitsCount[digit]);
    }
  }

  // Korrigiere die Anzahl der Kühe, wenn sie größer als die verbleibenden Ziffern in der geheimen Zahl ist
  cows = Math.max(cows, 0);


  // Gib das Ergebnis mit der Anzahl der Stiere und Kühe zurück
  return { bulls, cows };
}



// Funktion zur Überprüfung der Gültigkeit eines Tipps
function validateGuess(guess) {
  if (!guess) {
    return false;
  }

  if (guess.length !== 4 || isNaN(guess)) {
    return false;
  }

  const uniqueDigits = new Set(guess);
  if (uniqueDigits.size !== 4) {
    return false;
  }

  return true;
}

// Hauptspielablauf
function playGame() {
  console.log(`Willkommen zu Bulls und Kühe, ${name}!`);
  console.log('Ich denke mir eine Zahl aus. Versuche sie zu erraten!');

  const secretNumber = generateSecretNumber();
  let attempts = 0;

  while (true) {
    const guess = prompt('Dein Tipp: ');

    if (!validateGuess(guess)) {
      console.log('Ungültige Eingabe. Bitte gib eine vierstellige Zahl mit eindeutigen Ziffern ein.');
      continue;
    }

    attempts++;

    const result = getBullsAndCows(guess, secretNumber);
    console.log(`Tipp: ${result.bulls} Stiere und ${result.cows} Kühe`);

    if (result.bulls === 4) {
      console.log(`Glückwunsch ${name}! Du hast die geheime Zahl ${secretNumber} in ${attempts} Versuchen erraten.`);
      break;
    } else if (result.bulls === 0 && result.cows === 0) {
      // Keine Stiere und keine Kühe
      const message = getRandomMessage();
      console.log(message);
    }
    bulls = 0;
    cows = 0;
    console.log(bulls, cows);
  }
}

// Funktion zur Auswahl einer zufälligen Nachricht
function getRandomMessage() {
  const messages = [
    "Keine Stiere und keine Kühe. Du bist noch weit entfernt!",
    "Null Stiere und null Kühe. Das ist nicht einmal warm!",
    "Oh nein, keine Übereinstimmungen. Versuch es noch einmal, aber anders!",
    "Keine Stiere und keine Kühe. Das war nicht mal nah dran!",
    "Hmm, leider keine Übereinstimmungen. Denk nochmal nach und versuch es erneut!"
  ];

  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

// Spiel starten
playGame();
