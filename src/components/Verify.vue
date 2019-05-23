<template>
  <div name="enroll">
    <video class="player" ref="player" id="player" autoplay playsinline></video>
    <canvas ref="canvas" id="canvas" class="canvas"></canvas>

     <b-card title="Check Person's Identity" bg-variant="primary light fixed-bottom" text-variant="white" class="text-center">
      <div class="innerBox d-flex justify-content-center flex-column">
        <div :disabled="isSending">
          <b-button :to="{ name: 'home'}" size="lg" :disabled="isSending" variant="secondary">Cancel</b-button>
          <b-button size="lg" :disabled="isSending" variant="success" @click="sendPhoto">{{ sendButtonText }}</b-button>
        </div>
      </div>
      <b-modal centered cancel-disabled no-close-on-esc no-close-on-backdrop hide-header-close header-text-variant="primary" body-text-variant="primary" v-model="modalShow" id="modal" size="sm" title="Face Recognition Major Project">
        {{ modalText }}
        <b-img :disabled="showMemberPhoto" :src=memberPhoto fluid />
        <div slot="modal-footer" class="w-100">
          <b-button size="sm" class="float-right" variant="primary" @click="cleanUp">Close</b-button>
        </div>
      </b-modal>
     </b-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Enroll',
  data () {
    return {
      player: undefined,
      sendButtonText: 'Verify photo',
      isSending: false,
      photoFilename: '',
      modalText: '',
      modalShow: false,
      memberPhoto: '',
      showMemberPhoto: false
    }
  },
  mounted () {
    let that = this
    this.player = this.$refs.player
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log('mediaDevice found')
      navigator.mediaDevices.getUserMedia({ video: true, facingMode: { exact: 'environment' }
      }).then(function (stream) {
        console.log('stream acquired')
        that.player.srcObject = stream
        console.log('srcObject set')
      })
    }
  },
  methods: {
    async sendPhoto () {
      this.isSending = true
      this.sendButtonText = 'Uploading...'

      // Get image data from the canvas
      const canvas = this.$refs.canvas
      const context = canvas.getContext('2d')
      var w = canvas.width = this.player.videoWidth
      var h = canvas.height = this.player.videoHeight
      context.drawImage(this.player, 0, 0, w, h)
      const uploadData = canvas.toDataURL('image/png')

      // stop video
      this.player.srcObject.getVideoTracks().forEach(track => track.stop())

      // get signed url
      console.log(`About to send to ${this.$API}`)
      const response = await axios({ method: 'GET', url: `${this.$API}/upload/verify` })
      console.log('Response: ', response.data)

      // Prepare blob from canvas data
      let binary = atob(uploadData.split(',')[1])
      let array = []
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
      }
      let blobData = new Blob([new Uint8Array(array)], { type: 'image/png' })
      this.photoFilename = response.data.photoFilename

      // Upload png to S3 using the signed URL
      const result = await fetch(response.data.uploadURL, { method: 'PUT', body: blobData })
      console.log('Result: ', result)

      // Check if the photo has been indexed. Retry every second.
      let i = 0
      let status = {}
      do {
        await this.sleep(1000) // set delay for retries
        status = await axios({
          method: 'GET',
          url: `${this.$API}/checkstatus?photoFilename=${this.photoFilename}`
        })
        i++
        console.log('Request status: ', status)
        if (status.data) break
      } while (i < 5)

      // Tell user about what happened...
      switch (status.data.result) {
        case 'MATCH':
          console.log(status.data)
          const memberPhoto = status.data.rekognition.FaceMatches[0].Face.ExternalImageId
          this.modalText = 'Success! This person is known to you and Here is the image you have used previously'
          this.memberPhoto = `${this.$PHOTOS_URL}/${memberPhoto}`
          this.showMemberPhoto = true
          break
        case 'NO_MATCH':
          this.modalText = 'This is a new person to you.'
          break
        case 'NO_FACES':
          this.modalText = 'There is no face in this photo.'
          break
      }
      this.modalShow = true
    },
    cleanUp () {
      console.log('Cleaning up')
      this.sendButtonText = 'Send Photo'
      this.isSending = false
      this.photoFilename = ''
      this.modalText = ''
      this.modalShow = false
      this.$router.push('/')
      this.memberPhoto = ''
      this.showMemberPhoto = false
    },
    async sleep (ms) {
      console.log('sleep')
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }
}
</script>

<style>
  .player {
    width: 100%;
    height: auto;
  }
  .canvas {
    width: 640px;
    height: 480px;
    display: none;
  }
</style>
