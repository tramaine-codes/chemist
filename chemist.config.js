export default {
  name: 'chemist',
  git: {
    url: 'git@github.com:tramaine-codes/chemist.git',
  },
  compression: {
    destination: 'dist',
    include: [
      'lib/**/*',
      'node_modules/**/*',
      'package.json',
      'package-lock.json',
      'LICENSE',
    ],
  },
};
