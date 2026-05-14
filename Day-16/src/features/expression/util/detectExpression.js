export default function detectExpression(blendShapes) {
  const getScore = (name) => {
    return (
      blendShapes.find(
        (shape) => shape.categoryName === name
      )?.score || 0
    );
  };

  // Smile
  const smileLeft = getScore("mouthSmileLeft");
  const smileRight = getScore("mouthSmileRight");

  // Mouth open
  const jawOpen = getScore("jawOpen");

  // Blink
  const blinkLeft = getScore("eyeBlinkLeft");
  const blinkRight = getScore("eyeBlinkRight");

  // Surprise
  const browUp = getScore("browInnerUp");

  // Pout
  const mouthPucker = getScore("mouthPucker");

  // Angry
  const browDownLeft = getScore("browDownLeft");
  const browDownRight = getScore("browDownRight");

  // Sad
  const frownLeft = getScore("mouthFrownLeft");
  const frownRight = getScore("mouthFrownRight");

  // Confused / skeptical
  const browOuterUpLeft = getScore("browOuterUpLeft");
  const browOuterUpRight = getScore("browOuterUpRight");

  // Laughing
  const cheekSquintLeft = getScore("cheekSquintLeft");
  const cheekSquintRight = getScore("cheekSquintRight");

  // ========= EXPRESSIONS =========

  // Laughing
  if (
    smileLeft > 0.06 &&
    smileRight > 0.06 &&
    cheekSquintLeft > 0.002 &&
    cheekSquintRight > 0.002
  ) {
    return "😂 Laughing";
  }

  // Smiling
  if (smileLeft > 0.7 && smileRight > 0.7) {
    return "😊 Smiling";
  }

  // Angry
  if (
    browDownLeft > 0.09 &&
    browDownRight > 0.09
  ) {
    return "😠 Angry";
  }

  // Sad
if (
  
    frownLeft > 0.001 ||
    frownRight > 0.001
  
) {
  return "😢 Sad";
}

  // Surprised
  if (browUp > 0.7 && jawOpen > 0.4) {
    return "😲 Surprised";
  }

  // Mouth open
  if (jawOpen > 0.4) {
    return "😮 Mouth Open";
  }

  // Blinking
  if (
    blinkLeft > 0.7 ||
    blinkRight > 0.7
  ) {
    return "😉 Blinking";
  }

  // Pout
  if (mouthPucker > 0.4) {
    return "😗 Pout";
  }

  // Confused
  if (
    browOuterUpLeft > 0.7 ||
    browOuterUpRight > 0.7
  ) {
    return "🤨 Confused";
  }

  return "😐 Neutral";
}