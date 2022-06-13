document.getElementById("updateButton").addEventListener("click", updateEntry)
document.getElementById("deleteButton").addEventListener("click", deleteEntry)

async function updateEntry() {
  try {
    const response = await fetch("updateEntry", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        song: document.getElementsByName("songName")[0].value,
        album: document.getElementsByName("album")[0].value,
        track: document.getElementsByName("track")[0].value,
        image: document.getElementsByName("image")[0].value,
        lyrics: document.getElementsByName("lyrics")[0].value,
      }),
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (error) {
    console.log(error)
  }
}

async function deleteEntry() {
  const input = document.getElementById("deleteInput")
  console.log(input.value)
  try {
    const response = await fetch("deleteEntry", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: input.value,
      }),
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.log(err)
  }
}
