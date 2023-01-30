export default async function () {
  return {
    authentication: (servername) => {
      if (servername === "websockets") {
        return {
          token: process.env.TOKEN,
        };
      }
    },
  };
}
