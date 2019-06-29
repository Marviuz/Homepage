import Vue from 'vue';
import kebabCase from 'lodash/kebabCase';

const requireComponent = require.context('.', false, /M[\w]+\.vue$|M[\w]+\.jsx$|M[\w]+\.js$/);

requireComponent.keys().forEach((fileName) => {
  const componentName = kebabCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''));
  const componentConfig = requireComponent(fileName);

  Vue.component(componentName, componentConfig.default || componentConfig);
});
