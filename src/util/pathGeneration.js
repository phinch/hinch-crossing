// the idea here is a function that generates an SVG path that spans the width and height of the document, and is random every time
// i guess what i want is like a tv screen where it bounces off the walls?
// although i could see curviness happening as well, if the curves can be well-formed

export function generatePath(element) {
  if (!element) return '';
  // Choose a direction (angle out of 360) and find the boundary of the screen
  const currentX = element.getBoundingClientRect().x;
  const currentY = element.getBoundingClientRect().y;

  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  const initialDirection = Math.floor(Math.random() * 360);
  const initialSlope = Math.tan(initialDirection);

  let path = `m${Math.round(currentX)},${Math.round(currentY)} `;

  // Determine point of contact with edge
  const contactPoint = (() => {
    const leftContact = [0, currentY + -currentX * initialSlope];
    const rightContact = [
      windowWidth,
      currentY + (windowWidth - currentX) * initialSlope,
    ];
    const topContact = [currentX + -currentY * initialSlope, 0];
    const bottomContact = [
      currentX + (windowHeight - currentY * initialSlope),
      windowHeight,
    ];

    // This simply is not it
    const rightIn = rightContact[1] <= windowHeight && rightContact[1] >= 0;
    const leftIn = leftContact[1] <= windowHeight && leftContact[1] >= 0;
    const topIn = topContact[0] <= windowWidth && topContact[0] >= 0;
    const bottomIn = bottomContact[0] <= windowWidth && bottomContact[0] >= 0;

    if (initialDirection < 90) {
      if (rightIn) return rightContact;
      return topContact;
    } else if (initialDirection < 180) {
      if (leftIn) return leftContact;
      return topContact;
    } else if (initialDirection < 270) {
      if (leftIn) return leftContact;
      return bottomContact;
    } else {
      if (rightIn) return rightContact;
      return bottomContact;
    }
  })();

  path += `${Math.round(contactPoint[0])},${Math.round(contactPoint[1])}`;

  return path;

  // Big question is how do we end it? Or do we have it set to run for a certain time and then recall this function?

  // The boundary of the screen means the path should "bounce" at an angle of...some variance
  // what's the math here lol. it's like...supposed to be you draw a straight line at the point of arrival
  // and then reflect the angle across right. so 45 becomes 90, 60 becomes 120, 34.5 becomes 69, etc.
}
