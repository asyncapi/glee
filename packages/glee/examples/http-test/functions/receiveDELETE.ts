export default async function ({ payload }) {
  if (!payload.url) {
    console.error("DELETE receive failed.")
    return
  }

  console.log("DELETE operation succeded..")
}
