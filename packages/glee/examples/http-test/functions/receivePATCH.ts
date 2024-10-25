export default async function ({ payload }) {
  if (!payload.url) {
    console.error("PATCH receive failed.")
    return
  }

  console.log("PATCH operation succeded..")
}
