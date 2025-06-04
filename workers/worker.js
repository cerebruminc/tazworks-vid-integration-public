addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Log the incoming request details
  console.log(`Handling ${request.method} request to ${request.url}`);

  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    console.log("Processing CORS preflight request");
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  // Get the response from the origin
  const response = await fetch(request);

  // Clone the response and add CORS headers
  const responseClone = new Response(response.body, response);
  responseClone.headers.set("Access-Control-Allow-Origin", "*");
  responseClone.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );
  responseClone.headers.set("Access-Control-Allow-Headers", "Content-Type");

  const contentType = responseClone.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    return responseClone;
  }

  const rewriter = new HTMLRewriter().on("head", {
    element(element) {
      element.append(
        `<script type="text/javascript">
            const observer = new MutationObserver(function(mutations) {
              if (document.body) {
                const script = document.createElement('script');
                script.src = 'https://unpkg.com/tazworks-vid-order-button@0.2.4/dist/vid-order-button.min.js';
                script.type = 'text/javascript';
                document.body.appendChild(script);
                observer.disconnect();
              }
            });
            
            observer.observe(document.documentElement, {
              childList: true,
              subtree: true
            });
          </script>`,
        { html: true }
      );
    },
  });

  return rewriter.transform(responseClone);
}
