export default async function ({ payload }) {
  if (!payload.url) {
    console.error("POST receive failed.")
    return
  }
  console.log("POST operation succeded..")
}
