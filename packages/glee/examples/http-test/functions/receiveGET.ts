export default async function ({ payload }) {
  if (!payload.url) {
    console.error("GET receive failed.")
    return
  }

  console.log("GET operation succeded..")
}
