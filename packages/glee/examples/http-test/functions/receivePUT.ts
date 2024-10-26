export default async function ({ payload }) {
  if (!payload.url) {
    console.error("PUT receive failed.")
    return
  }

  console.log("PUT operation succeded..")
}
