const input = document.getElementById('file')

input.addEventListener('change', function uploadImage(event) {
  // Get the file from the input
  const file = event.target.files[0]
  if(!file) return

  const reader = new FileReader()

  // Wait for the file to be read
  reader.onload = (event) => {
    // Get the result content from the file (as data URL)
    const result = event.target.result

    // Create an empty image and add the result content to it
    const image = new Image()
    image.src = result

    // Wait for the image to be loaded
    image.onload = (event) => {
      // Create an empty canvas and set the size for it (using a constant to set the draw size too)
      const canvas = document.createElement('canvas')
      const IMAGE_SIZE = 128
      canvas.width = IMAGE_SIZE
      canvas.height = IMAGE_SIZE

      // Get the context of the canvas
      const context = canvas.getContext('2d')

      // Draw the image on the canvas (event target is the created image)
      // The image will be drawn from the top left corner (coordinates: [0, 0]) to the bottom right corner (coordinates: [IMAGE_SIZE, IMAGE_SIZE])
      context.drawImage(event.target, 0, 0, IMAGE_SIZE, IMAGE_SIZE)

      // Append the canvas to the body
      document.body.appendChild(canvas)

      // Also can be used to get the data URL of the resized image
      // to use it as a source for an image instead of the canvas or save it in a database
      console.log(canvas.toDataURL())
    }
  }

  // Handler for reader errors
  reader.onerror = (event) => {
    console.log(event.target.error)
  }

  // Read the file as a data URL, this will trigger the onload event
  reader.readAsDataURL(file)

  // Also can be used other methods to read the file but the result will be different
  // reader.readAsText(file)
  // reader.readAsArrayBuffer(file)
  // reader.readAsBinaryString(file)
})