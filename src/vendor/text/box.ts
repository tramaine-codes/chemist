import boxen from 'boxen';

export class Box {
  box = (text: string) =>
    boxen(text, {
      borderColor: 'green',
      borderStyle: 'double',
      margin: {
        top: 1,
        bottom: 1,
        left: 10,
        right: 0,
      },
      padding: {
        top: 1,
        bottom: 1,
        left: 15,
        right: 15,
      },
    });
}
