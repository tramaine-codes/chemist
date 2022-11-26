module.exports = {
  name: 'chemist',
  git: {
    url: 'git@github.com:tgillus/chemist.git',
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
