//Receives array of strings as a parameter, and returns new array that represents reformated path
import correctSpelling from './correct_spelling';
const getPathName = (pathArray: string[]): string[] => {
  let outputArray: string[] = [];
  if (pathArray.length > 1) {
    if (pathArray[1] !== 'shop' && pathArray[1] !== 'my-account') {
      pathArray.forEach((element: string, index: number) => {
        if (index === 0) {
          outputArray.push('Home');
          return;
        }
        outputArray.push(element);
      });
    } else {
      pathArray.forEach((element: string, index: number) => {
        if (index !== 0) {
          outputArray.push(element);
        }
      });
    }
  }
  for (let i = 0; i < outputArray.length; i++) {
    outputArray[i] = correctSpelling(outputArray[i]);
  }
  return outputArray;
};

export default getPathName;
