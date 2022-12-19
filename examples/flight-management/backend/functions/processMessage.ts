export default async function (event) {
  return {
    reply: [
      {
        payload: event.payload,
      },
    ],
  };
}
