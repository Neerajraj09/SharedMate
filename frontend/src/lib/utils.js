// src/lib/utils.js

export const cn = (...args) => {
    return args.filter(Boolean).join(' ');  // Filters out any falsy values and joins class names
  };
  