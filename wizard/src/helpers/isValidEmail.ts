export const isValidEmail = (email: string): boolean => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z-0-9]+(\.[a-zA-Z-0-9]+)*)\.[a-zA-Z]{2,})$/;
  return regex.test(email);
};
