export const effect = (fn) => {
  try {
    fn();
  } finally {
    // TODO effect try-catch finally...
  }
};
