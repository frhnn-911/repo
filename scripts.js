window.addEventListener('DOMContentLoaded', () => {
  const ufo = document.getElementById('ufo');
  const bubble = document.querySelector('.bubble-container');
  const bubbleText = document.getElementById('ufoText');
  const bgMusic = document.getElementById('bgMusic');
  const alien = document.getElementById('alien');
  const alienBubble = document.querySelector('.alien-bubble');
  const alienText = document.getElementById('alienText');
  const countdownButton = document.querySelector('.countdown-button');
  const rocket = document.querySelector('.rocket');
  const alienBubbleLeft = document.querySelector('.alien-bubble-left');
  const alienTextLeft = document.getElementById('alienTextLeft');
  const countdownDisplay = document.getElementById('countdownDisplay');
  const countdownText = document.getElementById('countdownText');
  const nextButton = document.getElementById('nextButton'); // ✅ Will check for existence later
  const happyBirthdayMessage = document.getElementById('happyBirthdayMessage'); // Add the element for the message

  let clickEnabled = false;
  let ufoClicked = false;
  let countdownEnabled = false;
  

  setTimeout(() => {
    ufo.style.opacity = 1;
  }, 1000);

  function typeWriter(text, element, speed, callback) {
    let i = 0;
    element.innerHTML = '';
    function typing() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else {
        if (callback) callback();
      }
    }
    typing();
  }

  function enableClick() {
    clickEnabled = true;
    document.body.style.pointerEvents = 'auto';
  }

  function disableClick() {
    clickEnabled = false;
    document.body.style.pointerEvents = 'none';
  }

  function typeUFOAndEnableClick() {
    const ufoDialogues = [
      "Oye hoye… itni der laga di aane mein?",
      "Hii cutie... finally nazar aayi!",
      "Alien toh tujhe dekh ke shock ho jayega!",
      "Knock karo... warna UFO apna dance show chalayega pura din!",
      "Ab tak nahi samjhi? Click karo yaar!",
      "Hint: Apni smartness ka use kar aur screen par tap kar do!",
    ];
  
    let i = 0;
    function typeNextDialogue() {
      if (i < ufoDialogues.length) {
        typeWriter(ufoDialogues[i], bubbleText, 50, () => {
          i++;
          setTimeout(typeNextDialogue, 0);
        });
      } else {
        setTimeout(enableClick, 100); // enableClick after all dialogues done
      }
    }
  
    typeNextDialogue();
  }
  

  setTimeout(() => {
    bubble.style.opacity = 1;
    disableClick();
    typeUFOAndEnableClick();
  }, 0);

  document.body.addEventListener('click', () => {
    if (clickEnabled && !ufoClicked) {
      ufoClicked = true;
      disableClick();
      
          // 🔊 Start background music here
          bgMusic.volume = 0.15;
          bgMusic.play().then(() => {
            console.log('Music started on UFO click ✅');
          }).catch(err => {
            console.log('Music failed to play:', err);
          });
      
          ufo.style.transition = 'all 2s ease';
          ufo.style.bottom = '100%';
          ufo.style.opacity = 0;
          bubble.style.opacity = 0;
      

      setTimeout(() => {
        alien.style.opacity = 1;
        alien.style.bottom = '37%';

        setTimeout(() => {
          alienBubble.style.opacity = 1;
          disableClick();
          typeAlienDialogue(() => {
            setTimeout(() => {
              alien.style.transition = 'all 2s ease';
              alien.style.bottom = '55%';
              alienBubble.style.transition = 'opacity 1s ease';
              alienBubble.style.opacity = 0;

              countdownButton.style.opacity = 1;
              countdownButton.disabled = false;
              countdownButton.classList.add('visible');
              countdownEnabled = true;

              countdownButton.style.pointerEvents = 'none';
              enableClick();

              rocket.style.transition = 'all 2s ease';
              rocket.style.opacity = 1;
              rocket.style.bottom = '0%';

              setTimeout(() => {
                alienBubbleLeft.style.opacity = 1;
                alienTextLeft.style.opacity = 1;
                typeLeftDialogue();
              }, 500);
            }, 500);
          });
        }, 500);
      }, 700);
    }
  });

  function typeAlienDialogue(finalCallback) {
    const dialogues = [
      "Yeh kaun aa gaya yaar... itna shine karke?",
      "Aree! Kisne meri neend ki band baja di?",
      "Lagta hai koi cute sa sapna chal raha hai...",
      "Wait...! yeh sapna nahi, asli glow-up hai!",
      "Ab yaad aaya! Boss ne tmhari cuteness ka zikr kiya tha..!!",
      "Boss ne bola tha — ‘jab wo aaye, to dil se welcome karna!’",
      "Cutiee... tum toh expectation se bhi zyada cute nikli!"
    ];

    let i = 0;
    function typeNextDialogue() {
      if (i < dialogues.length) {
        typeWriter(dialogues[i], alienText, 50, () => {
          i++;
          setTimeout(typeNextDialogue, 1200);
        });
      } else {
        if (finalCallback) finalCallback();
      }
    }

    typeNextDialogue();
  }

  function typeLeftDialogue() {
    const leftDialogues = [
      "Oye hoye... dekho toh sahi, rocket bhi sharma gaya!",
      "Boss ne bola tha: 'itne special insaan ke liye rocket bhi designer hona chahiye!'",
      "Chalo chalo... button daba do, warna rocket udaas ho jayega!"
    ];

    let i = 0;
    function typeNextLeftDialogue() {
      if (i < leftDialogues.length) {
        typeWriter(leftDialogues[i], alienTextLeft, 50, () => {
          i++;
          setTimeout(typeNextLeftDialogue, 1200);
        });
      } else {
        setTimeout(() => {
          countdownButton.style.pointerEvents = 'auto';
        }, 500);
      }
    }

    typeNextLeftDialogue();
  }

  function startCountdown() {
    let timeLeft = 5;
    countdownDisplay.classList.add('visible');
    countdownText.textContent = timeLeft;

    const countdownInterval = setInterval(() => {
      timeLeft--;
      countdownText.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        countdownDisplay.classList.remove('visible');
        launchRocket();
      }
    }, 1000);
  }

  countdownButton.addEventListener('click', () => {
    if (countdownEnabled) {
      countdownButton.disabled = true;
      countdownButton.style.opacity = 0;
      countdownButton.style.pointerEvents = 'none';

      alienBubbleLeft.style.transition = 'opacity 1s ease';
      alienBubbleLeft.style.opacity = 0;

      setTimeout(() => {
        countdownButton.style.display = 'none';
      }, 100);

      startCountdown();
    }
  });

  function launchRocket() {
    rocket.style.transition = 'all 2s ease';
    rocket.style.bottom = '85%';

    rocket.addEventListener('transitionend', () => {
      // 🚀 Disappear rocket instantly
      rocket.style.opacity = 0;
      rocket.style.display = 'none';

      triggerConfettiAndFireworks();

      // Show "Happy Birthday" message at bottom 33%
      setTimeout(() => {
        happyBirthdayMessage.classList.add('visible'); // Add visible class to show the message
      }, 0); // Adjust delay as necessary
    }, { once: true });
  }

  function triggerConfettiAndFireworks() {
    // 🎉 Confetti
    const confetti = document.createElement('video');
    confetti.src = 'animations/confetti.webm';
    confetti.autoplay = true;
    confetti.loop = false;
    confetti.style.position = 'fixed';
    confetti.style.bottom = '70%'; // 85% from the bottom
    confetti.style.left = '50%'; // Center horizontally
    confetti.style.transform = 'translateX(-50%)'; // Align the center
    confetti.style.zIndex = '9999';
    confetti.style.opacity = '1';

    document.body.appendChild(confetti);

    confetti.addEventListener('ended', () => {
      confetti.remove();
    });

    // 🎆 Fireworks
    const fireworks = document.createElement('video');
    fireworks.src = 'animations/fw.webm';
    fireworks.autoplay = true;
    fireworks.loop = false;
    fireworks.style.position = 'fixed';
    fireworks.style.top = '0';
    fireworks.style.left = '0';
    fireworks.style.width = '100%';
    fireworks.style.height = '100%';
    fireworks.style.pointerEvents = 'none';
    fireworks.style.zIndex = '9999';
    fireworks.style.opacity = '1';

    document.body.appendChild(fireworks);

    fireworks.addEventListener('ended', () => {
      fireworks.remove();
    });

    const happyBirthdayBubble = document.createElement('div');
      happyBirthdayBubble.classList.add('right-bubble');
      happyBirthdayBubble.style.position = 'absolute';
      happyBirthdayBubble.style.bottom = '22%'; // Same position as first bubble
      happyBirthdayBubble.style.left = '50%';
      happyBirthdayBubble.style.transform = 'translateX(-50%)';
      happyBirthdayBubble.style.opacity = '1';
      happyBirthdayBubble.style.transition = 'opacity 1s ease';

      const happyBirthdayText = document.createElement('span');
      happyBirthdayText.classList.add('alien-text');
      happyBirthdayText.textContent = "Happy Birthday!";

      happyBirthdayBubble.appendChild(happyBirthdayText);
      document.body.appendChild(happyBirthdayBubble);

      // Wait for 2 seconds, then fade out
      setTimeout(() => {
        happyBirthdayBubble.style.opacity = 0; // Fade out after a while
        setTimeout(() => {
          happyBirthdayBubble.remove(); // Remove the bubble after fade-out
        }, 1000); // Wait 1 second before removing the element
      }, 4000); // Show for 2 seconds before fading out
    


    // 🎁 Show "Next" button
    if (nextButton) {
      setTimeout(() => {
        nextButton.classList.remove('hidden');
        nextButton.classList.add('visible');
      }, 1800);
    }   
    nextButton.addEventListener('click', () => {
      // Move to next part or page
      window.location.href = 'page2.html'; // Or trigger next animation
    });
     
  }
});

const emojiContainer = document.getElementById('emojiContainer');
const emojiList = ['💕', '🚀', '🛸', '👽', '💫', '❤️', '🎂', '✨', '🦄'];

function spawnMultipleEmojis() {
  const count = Math.floor(Math.random() * 6) + 3; // 1 to 4 emojis at once

  for (let i = 0; i < count; i++) {
    const emoji = document.createElement('div');
    emoji.classList.add('floating-emoji');
    emoji.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];

    const leftPosition = Math.random() * 95; // 0 to 95vw
    emoji.style.left = `${leftPosition}vw`;

    const randomSize = 0.8 + Math.random() * 0.5; // Size between 0.8rem to 1.5rem
    emoji.style.fontSize = `${randomSize}rem`;

    emoji.style.zIndex = '1'; // Ensures emojis are behind alien, rocket, etc.

    emojiContainer.appendChild(emoji);

    setTimeout(() => {
      emoji.remove();
    }, 4000);
  }
}

// Spawn random emojis every 800-1300ms
setInterval(() => {
  spawnMultipleEmojis();
}, Math.random() * 500 + 800);
