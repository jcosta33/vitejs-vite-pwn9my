export default () => (
  typeof window.orientation !== 'undefined'
        || navigator.userAgent.includes('IEMobile')
);
