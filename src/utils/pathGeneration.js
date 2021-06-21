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

  let path = `M0,0 `;

  // Determine point of contact with edge
  const contactPoint = (() => {
    const leftContact = [0 - currentX, 0 + -currentX * initialSlope];
    const rightContact = [
      windowWidth - currentX,
      0 + (windowWidth - currentX) * initialSlope,
    ];
    const topContact = [0 + -currentY * initialSlope, 0 - currentY];
    const bottomContact = [
      0 + (windowHeight - currentY * initialSlope),
      windowHeight - currentY,
    ];

    // This simply is not it
    const rightIn =
      rightContact[1] <= windowHeight - currentY &&
      rightContact[1] >= 0 - currentY;
    const leftIn =
      leftContact[1] <= windowHeight - currentY &&
      leftContact[1] >= 0 - currentY;
    const topIn =
      topContact[0] <= windowWidth - currentX && topContact[0] >= 0 - currentX;
    const bottomIn =
      bottomContact[0] <= windowWidth - currentX &&
      bottomContact[0] >= 0 - currentX;

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
