
export function ScrollToTheTop(behaviourType : any) {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: behaviourType,
  });
}
