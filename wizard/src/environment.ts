// The 'env' constant is defined using an Immediately Invoked Function Expression (IIFE).
// This design pattern allows the creation of a new lexical scope, allowing complex conditional logic to be used to define the 'env' constant.
// The IIFE is executed right after its definition, initializing the 'env' constant with the appropriate environment variables.
// Note that these values are known public values, that can only be used by code running on a whitelisted set of domains, so don't freak out!
export const env = (() => {
  const url = typeof window !== "undefined" ? window.location.origin : process.env.HOSTNAME || "";

  // NOTE: These variables will only work with <Org Name>.vid.page/<Org code> URLS. ie, only for the static code page.

  if (url.includes("vidregistration.staging.cerebrum.com")) {
    return {
      SERVER_URL: "https://api.staging.cerebrum.com",
    };
  }
  if (url.includes("vidregistration.dev.cerebrum.com")) {
    return {
      SERVER_URL: "https://api.dev.cerebrum.com",
    };
  }
  if (url.includes("localhost") || url.includes("local-front.cerebrum.com")) {
    // Dev
    return {
      SERVER_URL: "https://api.dev.cerebrum.com",
    };
  }

  return {
    // Production
    SERVER_URL: "https://api.cerebrum.com",
  };
})();

export const graphqlEndpointUrl = `${env.SERVER_URL}/graphql`;
