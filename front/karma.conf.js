module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // Configuration optionnelle pour Jasmine
      },
      clearContext: false // laisser visible la sortie du Jasmine Spec Runner dans le navigateur
    },
    jasmineHtmlReporter: {
      suppressAll: true // supprimer les traces dupliquées
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/bobapp'),
      subdir: '.',
      reporters: [
        { type: 'html' },         // Génère un rapport HTML lisible localement
        { type: 'text-summary' },  // Génère un résumé texte de la couverture
        { type: 'lcov' }           // Ajoute un rapport LCOV nécessaire pour SonarCloud
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
